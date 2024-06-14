import re
import subprocess

import requests
from bs4 import BeautifulSoup
from celery import shared_task
from django.utils import timezone

from .models import Port
from common.models import ScanJob

@shared_task(bind=True)
def scan_ports(self, target, ports, from_job_id=None):

    # 创建PortScanJob实例，使用找到的from_job_instance
    scan_job = ScanJob.objects.create(
        type='PORT',
        target=target,
        status='R',
        task_id=self.request.id,
        from_job_id=from_job_id  # 使用实际的PortScanJob实例
    )

    temp_file_path = f"/tmp/{scan_job.task_id}.txt"
    all_ports_found = set()

    try:
        # 扫描逻辑与端口分割
        if '-' in ports:
            start_port, end_port = map(int, ports.split('-'))
            port_ranges = [(start, min(start + 999, end_port)) for start in range(start_port, end_port + 1, 1000)]
        else:
            port_ranges = [ports]

        for port_range in port_ranges:
            # 构建并执行nmap命令
            if isinstance(port_range, tuple):
                port_range_str = f"{port_range[0]}-{port_range[1]}"
            else:
                port_range_str = port_range

            cmd = f"nmap -n --resolve-all -Pn --min-hostgroup 64 --max-retries 0 --host-timeout 10m --script-timeout 3m --version-intensity 9 --min-rate 10000 -T4 {target} -p {port_range_str} -oN {temp_file_path}"
            process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            _, stderr = process.communicate()

            if stderr or process.returncode != 0:
                scan_job.status = 'E'
                scan_job.error_message = f'Nmap 扫描失败: {stderr.decode()}'
                break

            # 读取输出并查找开放端口
            with open(temp_file_path, 'r') as file:
                output = file.read()
            open_ports = re.findall(r'(\d+)/tcp\s+open\s+(\S+)', output)
            new_ports_found = set(open_ports) - all_ports_found

            if new_ports_found:
                all_ports_found.update(new_ports_found)  # 更新所有找到的端口集合
                for port, service in new_ports_found:
                    new_port = Port.objects.create(
                        scan_job=scan_job,
                        port_number=int(port),
                        service_name=service,
                        protocol='tcp',
                        state='open',
                        ip_address=target,
                        from_asset=target,
                    )
                    new_port.save()

        if not all_ports_found:
            scan_job.status = 'E'
            scan_job.error_message = '没有找到开放的端口。'
        else:
            scan_job.status = 'C'

    except Exception as e:
        scan_job.status = 'E'
        scan_job.error_message = f'扫描过程中发生异常: {str(e)}'

    finally:
        scan_job.end_time = timezone.now()
        scan_job.save()
        # os.remove(temp_file_path)

        if scan_job.status == 'E':
            return {'error': scan_job.error_message}
        return {'message': f'扫描完成: {target}'}
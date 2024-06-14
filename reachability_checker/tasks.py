import subprocess
import json
from celery import shared_task
from django.db import transaction

from .models import Reachability

@shared_task(bind=True)
def scan_reachability(self, target):
    # 构建输出文件名
    task_id = self.request.id
    output_file_path = f"/tmp/{task_id}.json"

    # 构建httpx命令
    cmd = f"httpx -u {target} -sc -cl -ct -location -rt -title -method -server -ip -cname -cdn -probe -fr -ss -ehb -j -o {output_file_path}"

    try:
        # 执行httpx命令
        process = subprocess.run(cmd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # 从输出文件读取结果
        with open(output_file_path, 'r') as file:
            for line in file:
                result = json.loads(line.strip())  # 逐行读取并解析JSON

                # 提取结果中的各个字段
                timestamp = result.get('timestamp')
                port = result.get('port')
                url = result.get('url')
                title = result.get('title')
                scheme = result.get('scheme')
                webserver = result.get('webserver')
                content_type = result.get('content_type')
                method = result.get('method')
                host = result.get('host')
                path = result.get('path')
                response_time = result.get('time')
                a_records = result.get('a')
                cname_records = result.get('cname')
                tech = result.get('tech')
                words = result.get('words')
                lines = result.get('lines')
                status_code = result.get('status_code')
                content_length = result.get('content_length')
                failed = result.get('failed')
                stored_response_path = result.get('stored_response_path')
                screenshot_path = result.get('screenshot_path')
                screenshot_path_rel = result.get('screenshot_path_rel')

                # 创建Reachability对象
                with transaction.atomic():
                    Reachability.objects.create(
                        timestamp=timestamp,
                        port=port,
                        url=url,
                        title=title,
                        scheme=scheme,
                        webserver=webserver,
                        content_type=content_type,
                        method=method,
                        host=host,
                        path=path,
                        time=response_time,
                        a=a_records,
                        cname=cname_records,
                        tech=tech,
                        words=words,
                        lines=lines,
                        status_code=status_code,
                        content_length=content_length,
                        failed=failed,
                        stored_response_path=stored_response_path,
                        screenshot_path=screenshot_path,
                        screenshot_path_rel=screenshot_path_rel,
                    )

        return {'message': f'HTTPX扫描完成: {target}'}
    except subprocess.CalledProcessError as e:
        error_message = f'HTTPX扫描失败: {e.stderr.decode()}'
        return {'error': error_message}
    except Exception as e:
        error_message = f'处理HTTPX扫描结果时发生异常: {str(e)}'
        return {'error': error_message}
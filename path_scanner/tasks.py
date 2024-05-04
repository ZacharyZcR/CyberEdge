import json
import subprocess

from celery import shared_task
from django.utils import timezone

from common.models import ScanJob
from .models import Path # 确保导入模型

@shared_task(bind=True)
def scan_paths(self, wordlist, target, delay, from_job_id=None):
    # 确保URL格式正确，移除FUZZ前的斜杠（如果存在）
    path = target.replace('/FUZZ', 'FUZZ')  # 直接替换'/FUZZ'为'FUZZ'
    url = target.replace('/FUZZ', '')
    target = url.replace('https://','')
    target = target.replace('http://', '')

    scan_job = ScanJob.objects.create(
        type='PATH',
        target=url,
        status='R',
        task_id=self.request.id,
        from_job_id=from_job_id,
    )

    # 构建输出文件名
    output_file_path = f"/tmp/{scan_job.task_id}.json"

    # 构建ffuf命令
    cmd = f"ffuf -w {wordlist} -u {path} -r -p {delay} -mc all -o {output_file_path} -of json"

    try:
        # 执行ffuf命令
        process = subprocess.run(cmd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # 解析ffuf输出结果
        with open(output_file_path, 'r') as file:
            results = json.load(file)
            if 'results' in results:
                for result in results['results']:
                    Path.objects.create(
                        scan_job=scan_job,
                        url=url,
                        path=url + result['input']['FUZZ'],
                        content_type=result.get('content_type', ''),
                        status=result['status'],
                        length=result['length'],
                        from_asset=target,
                    )
                scan_job.status = 'C'  # 标记为完成
            else:
                scan_job.status = 'E'
                scan_job.error_message = 'ffuf扫描没有返回结果'
    except subprocess.CalledProcessError as e:
        scan_job.status = 'E'  # 标记为错误
        scan_job.error_message = f'ffuf扫描失败: {e.stderr.decode()}'
    except Exception as e:
        scan_job.status = 'E'  # 标记为错误
        scan_job.error_message = f'处理ffuf扫描结果时发生异常: {str(e)}'
    finally:
        scan_job.end_time = timezone.now()
        scan_job.save()

        # 可选：删除输出文件或保留供后续审查

        if scan_job.status == 'E':
            return {'error': scan_job.error_message}
        return {'message': f'路径扫描完成: {url}'}
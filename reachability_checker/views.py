from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .tasks import scan_reachability
from .models import Reachability

@csrf_exempt  # 允许跨站请求
@require_http_methods(["POST"])  # 限制只接受POST请求
def reachability_check_view(request):
    try:
        # 解析请求体中的JSON
        data = json.loads(request.body.decode('utf-8'))
        targets = data.get('targets', '')  # 从请求中获取目标URL列表
    except json.JSONDecodeError:
        return JsonResponse({'error': '无效的JSON格式'}, status=400)

    # 分割逗号分隔的目标URL，并移除空字符串
    targets_list = [url.strip() for url in targets.split(',') if url.strip()]
    if not targets_list:
        return JsonResponse({'error': '缺少必要的targets参数或格式错误'}, status=400)

    task_ids = []
    # 对每个目标URL启动一个任务
    for target in targets_list:
        task = scan_reachability.delay(target)
        task_ids.append(task.id)

    # 返回响应
    return JsonResponse({'message': f'共启动{len(task_ids)}个可达性检查任务', 'task_ids': task_ids})

@csrf_exempt
@require_http_methods(["GET"])  # 只接受GET请求
def get_all_reachability_results_view(request):
    # 获取所有Reachability实例的概要信息
    reachability_results = Reachability.objects.all()
    results_list = []
    for result in reachability_results:
        results_list.append({
            'timestamp': result.timestamp.strftime('%Y-%m-%d %H:%M:%S') if result.timestamp else None,
            'port': result.port,
            'url': result.url,
            'title': result.title,
            'scheme': result.scheme,
            'webserver': result.webserver,
            'content_type': result.content_type,
            'method': result.method,
            'host': result.host,
            'path': result.path,
            'time': result.time,
            'a': result.a,
            'cname': result.cname,
            'tech': result.tech,
            'words': result.words,
            'lines': result.lines,
            'status_code': result.status_code,
            'content_length': result.content_length,
            'failed': result.failed,
            'stored_response_path': result.stored_response_path,
            'screenshot_path': result.screenshot_path,
            'screenshot_path_rel': result.screenshot_path_rel,
        })

    # 返回响应
    return JsonResponse({'results': results_list}, safe=False)  # safe=False允许非字典对象被序列化为JSON
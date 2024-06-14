from django.db import models

class Reachability(models.Model):
    timestamp = models.DateTimeField(verbose_name='时间戳')
    port = models.CharField(max_length=10, verbose_name='端口')
    url = models.URLField(verbose_name='URL')
    title = models.CharField(max_length=255, verbose_name='页面标题')
    scheme = models.CharField(max_length=10, verbose_name='协议')
    webserver = models.CharField(max_length=255, verbose_name='Web服务器')
    content_type = models.CharField(max_length=255, verbose_name='内容类型')
    method = models.CharField(max_length=10, verbose_name='请求方法')
    host = models.GenericIPAddressField(verbose_name='主机IP')
    path = models.CharField(max_length=255, verbose_name='路径')
    time = models.CharField(max_length=50, verbose_name='响应时间')
    a = models.JSONField(verbose_name='A记录')
    cname = models.JSONField(verbose_name='CNAME记录')
    tech = models.JSONField(verbose_name='技术栈')
    words = models.IntegerField(verbose_name='词数')
    lines = models.IntegerField(verbose_name='行数')
    status_code = models.IntegerField(verbose_name='状态码')
    content_length = models.IntegerField(verbose_name='内容长度')
    failed = models.BooleanField(verbose_name='是否失败')
    stored_response_path = models.CharField(max_length=255, verbose_name='存储响应路径')
    screenshot_path = models.CharField(max_length=255, verbose_name='截图路径')
    screenshot_path_rel = models.CharField(max_length=255, verbose_name='相对截图路径')
from django.db import models
from common.models import ScanJob
from django.contrib.contenttypes.models import ContentType

class Port(models.Model):
    scan_job = models.ForeignKey(ScanJob, on_delete=models.CASCADE, related_name='ports', verbose_name='扫描任务')
    port_number = models.IntegerField(verbose_name='端口号')
    service_name = models.CharField(max_length=100, verbose_name='服务名称', null=True, blank=True)
    protocol = models.CharField(max_length=10, verbose_name='协议', null=True, blank=True)
    ip_address = models.CharField(max_length=15, verbose_name='IP地址')
    state = models.CharField(max_length=20, verbose_name='状态')
    from_asset = models.CharField(max_length=200, verbose_name='上游资产', null=True, blank=True)

    @property
    def url(self):
        return f"{self.ip_address}:{self.port_number}"

    def __str__(self):
        return f"{self.ip_address} - {self.port_number}/{self.protocol} - {self.state}"

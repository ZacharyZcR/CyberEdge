"""
URL configuration for cyberedge project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/port_scanner/', include('port_scanner.urls')),
    path('api/path_scanner/', include('path_scanner.urls')),
    path('api/subdomain_scanner/', include('subdomain_scanner.urls')),
    path('api/full_scanner/', include('full_scanner.urls')),
    path('api/target/', include('target.urls')),
    path('api/reachability_checker/', include('reachability_checker.urls'))
]

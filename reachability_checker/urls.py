from django.urls import path
from .views import (get_all_reachability_results_view,
                    reachability_check_view,)

urlpatterns = [
    path('check', reachability_check_view, name='reachability_check'),
    path('results', get_all_reachability_results_view, name='get_all_reachability_results'),
]


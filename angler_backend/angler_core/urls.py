from django.urls import path, include

from .views import (
    AnglerListApiView,
    AnglerListAppContView,
    AnglerListAllContView,
    LinkContainersView
)

urlpatterns = [
    path('api', AnglerListApiView.as_view()),
    path('app_cont', AnglerListAppContView.as_view()),
    path('all_cont', AnglerListAllContView.as_view()),
    path('cont_link', LinkContainersView.as_view())
]
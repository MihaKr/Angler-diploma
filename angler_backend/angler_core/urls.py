from django.urls import path, include

from .views import (
    AnglerListApiView,
    AnglerListAppContView
)

urlpatterns = [
    path('api', AnglerListApiView.as_view()),
    path('app_cont', AnglerListAppContView.as_view()),

]
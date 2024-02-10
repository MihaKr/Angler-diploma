from django.urls import path, include

from .views import (
    AnglerListApiView,
)

urlpatterns = [
    path('api', AnglerListApiView.as_view()),
]
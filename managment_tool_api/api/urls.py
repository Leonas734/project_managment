from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from api.views import ProjectViewSet, UserViewSet

from rest_framework import routers

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet, 'projects')

urlpatterns = [
    path('', include(router.urls)),
]

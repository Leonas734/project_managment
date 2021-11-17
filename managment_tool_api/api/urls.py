from django.urls import path
from django.urls.conf import include
from django.conf.urls import url


from api.views import CustomObtainAuthToken, ProjectTaskViewSet, ProjectViewSet, TaskCommentViewSet, UserViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet, 'projects')
router.register('tasks', ProjectTaskViewSet, 'tasks')
router.register('comment', TaskCommentViewSet, 'comment')

urlpatterns = [
    path('', include(router.urls)),
    url('auth/', CustomObtainAuthToken.as_view())
]

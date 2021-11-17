from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from api.models import Project, ProjectTask, User, ProjectTask
from api.serializers import ProjectSerializerLight, TaskCommentSerializer, UserSerializer, ProjectSerializer, ProjectTaskSerializer

from rest_framework import serializers, status, viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action


# Adding user.id and username to token authentication Response
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id, 'username': token.user.username})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )
    authentication_classes = (TokenAuthentication,  )
    http_method_names = ['put', 'post']
    

    def update(self, request, pk, *args, **kwargs):
        try:
            user = authenticate(username=request.user.username, password= request.data['current_password'])
            # Correct passsowrd and user is curently authenticated to the account that is requesting the password change
            if user and request.user.id == int(pk):
                user.set_password(request.data['new_password'])
                user.save()
                return Response (
                    {'message': 'Password successfully updated.'},
                    status=status.HTTP_200_OK
                )
        except:
            return Response (
                {'message': 'Please include the following: username, current_password, new_password'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response (
            {'message': 'Invalid details. Please try again'},
            status=status.HTTP_400_BAD_REQUEST
        )

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication,  )
    http_method_names = ['get', 'post', 'put']
    
    def list(self, request):
        queryset= Project.objects.filter(users=request.user)
        serializer = ProjectSerializerLight(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        project = get_object_or_404(Project, id=pk)
        # Check if user is part of project
        if request.user not in project.users.all():
            return Response({'detail': f"Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        return Response({'detail': "Method not allowed."}, status=status.HTTP_406_NOT_ACCEPTABLE)

class ProjectTaskViewSet(viewsets.ModelViewSet):
        serializer_class = ProjectTaskSerializer
        permission_classes = (IsAuthenticated, )
        authentication_classes = (TokenAuthentication,  )
        http_method_names = ['post', 'delete', 'get']

        def user_has_project_access(self, user, project):
            if user in project.users.all():
                return True
            return False

        def create(self, request):
            serializer = ProjectTaskSerializer(data=request.data)
            if serializer.is_valid():
                project_id = request.data['project']
                project = get_object_or_404(Project, id=project_id)
                # User not authorized to create tasks on current project
                if not self.user_has_project_access(request.user, project):
                    return Response({'detail': "Not found."}, status=status.HTTP_400_BAD_REQUEST)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        def retrieve(self, request, pk=None):
            task = get_object_or_404(ProjectTask, id=pk)
            # User does not have access to project to retrieve any of its tasks
            if not self.user_has_project_access(request.user, task.project):
                return Response({'detail': "Not found."}, status=status.HTTP_400_BAD_REQUEST)

            serializer = ProjectTaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)

        def destroy(self, request, pk):
            task = get_object_or_404(ProjectTask, id=pk)
            # Only creator of Task can delete it
            if request.user != task.creator:
                return Response({'detail': "Not found."}, status=status.HTTP_400_BAD_REQUEST)
            task.delete()
            return Response({'detail': 'Project task deleted.'}, status=status.HTTP_204_NO_CONTENT)
            
        def list(self, request):
            return Response({'detail': "Not found."}, status=status.HTTP_400_BAD_REQUEST)

class TaskCommentViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication,  )
    http_method_names = ['post']

    def create(self, request):
        serializer = TaskCommentSerializer(data=request.data)
        if serializer.is_valid():
            task_id = request.data['task']
            task = get_object_or_404(ProjectTask, id=task_id)
            # Check if user is part of project before allowing him to post a comment on a task
            if not request.user in task.project.users.all() or request.user.id != int(request.data['user']):
                return Response({'detail': "Not found."}, status=status.HTTP_400_BAD_REQUEST)
            print(serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

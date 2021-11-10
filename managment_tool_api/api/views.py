from django.contrib.auth import authenticate

from api.models import Project, User
from api.serializers import ProjectSerializerLight, UserSerializer, ProjectSerializer

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


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
    http_method_names = ['get', 'post']
    
    def list(self, request):
        queryset= Project.objects.filter(users=request.user)
        serializer = ProjectSerializerLight(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
            # Check if user is part of project
            if request.user not in project.users.all():
                raise ValueError('Unauthorized access')
            serializer = ProjectSerializer(project)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except:
            return Response({'message': 'Sorry you do not have valid access to this page'}, status=status.HTTP_401_UNAUTHORIZED)
        

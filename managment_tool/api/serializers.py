from api.models import Project, ProjectComment, User

from rest_framework import serializers
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        # Will never send password/email.
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'email': {'write_only': True, 'required': True},
            }

    # Overwriting create function to add a token
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
        
class ProjectSerializerLight(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'creator', 'users', 'total_comments']

class ProjectCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectComment
        fields = ['id', 'text', 'date_and_time', 'project']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        all_comments = ProjectCommentSerializer(many=True)
        fields = ['id', 'title', 'description', 'creator', 'users', 'all_comments']

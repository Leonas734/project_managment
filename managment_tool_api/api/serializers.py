from api.models import Project, TaskComment, User, ProjectTask
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
        fields = ['id', 'title', 'filter_tags','description', 'creator', 'users']

class TaskCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskComment
        fields = ['id', 'text', 'date_and_time', 'task', 'user']

class ProjectTaskSerializer(serializers.ModelSerializer):
    all_comments = TaskCommentSerializer(many=True, required=False)
    class Meta:
        model = ProjectTask
        fields = ['id', 'project', 'title', 'description', 'creator', 'filter_tag', 'assigned_users', 'total_comments', 'all_comments']

    # Overwriting create function to add filter_tag to Project
    def create(self, validated_data):
        # Have to create a new Project Task object because
        # ManyToMany relationship must be set()
        user = validated_data['creator']
        tag = validated_data['filter_tag']
        new_task = ProjectTask(
            title=validated_data['title'],
            description = validated_data['description'],
            filter_tag = tag,
            project = validated_data['project'],
            creator = user
        )
        new_task.save()
        new_task.assigned_users.set([user])
        new_task.save()

        # Append new filter tag
        project = new_task.project
        project_tags = new_task.project.filter_tags
        if tag not in project_tags:
            project_tags.append(tag)
            project.save()

        return new_task
        

class ProjectSerializer(serializers.ModelSerializer):
    all_tasks = ProjectTaskSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = ['id', 'title', 'filter_tags', 'description', 'creator', 'users', 'created', 'all_tasks']


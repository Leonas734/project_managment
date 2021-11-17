from django.db import models
from datetime import date

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    img = models.ImageField(default='/default_profile_picture.png')

    # Returns users Id, username and image URL in a dict object.
    def user_details(self):
        return {"id": self.id, "username": self.username, "img": self.img.url}

class Project(models.Model):
    filter_tags = models.JSONField(blank=True, default=list)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    creator = models.ForeignKey(User, related_name='project_creator', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='project_users')
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def all_tasks(self):
        all_tasks = self.project_tasks.filter(project=self)
        return all_tasks

    def creator_details(self):
        return self.creator.user_details()

    def project_users(self):
        all_project_users = []
        for usr in self.users.all():
            all_project_users.append(usr.user_details())
        return all_project_users

class ProjectTask(models.Model):    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_tasks")
    title= models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    creator = models.ForeignKey(User, related_name='task_creator', on_delete=models.CASCADE)
    filter_tag = models.CharField(max_length=10, blank=False)
    assigned_users = models.ManyToManyField(User, related_name='assigned_tasks')
    due_date = models.DateField(default=date.today)

    def total_comments(self):
        total = self.project_task_comment.all()
        return len(total)

    def all_comments(self):
        comments = self.project_task_comment.filter(task=self).order_by('-id')
        return comments

    def creator_details(self):
        return self.creator.user_details()

    def task_users_details(self):
        all_users = []
        for usr in self.assigned_users.all():
            all_users.append(usr.user_details())
        return all_users

class TaskComment(models.Model):
    text = models.TextField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_and_time = models.DateTimeField(auto_now=True)
    task = models.ForeignKey(ProjectTask, on_delete=models.CASCADE, related_name='project_task_comment')

    def user_details(self):
        return self.user.user_details()
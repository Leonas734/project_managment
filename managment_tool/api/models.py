from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    img = models.CharField(max_length=32, blank=True)

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    creator = models.ForeignKey(User, related_name='project_creator', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='project_users')

    def __str__(self):
        return self.title
    
    def total_comments(self):
        total = self.project_comment_link.all()
        return len(total)
    
    def all_comments(self):
        comments = self.project_comment_link.filter(project=self).values_list()
        return comments

class ProjectComment(models.Model):
    text = models.TextField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_and_time = models.DateTimeField(auto_now=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_comment_link', default=None)

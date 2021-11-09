from django.contrib import admin

from api.models import Project, ProjectComment, User

admin.site.register(User)
admin.site.register(Project)
admin.site.register(ProjectComment)
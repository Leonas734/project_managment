from django.contrib import admin

from api.models import Project, TaskComment, User, ProjectTask

admin.site.register(User)
admin.site.register(Project)
admin.site.register(TaskComment)
admin.site.register(ProjectTask)
from rest_framework import permissions

class ProjectTaskAuthenticator(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        print("PROJECT AUTH RAN")
        if request.user in obj.assigned_users.all():
            print("HELLO")
        print(view)
        print(request.data)
        return False

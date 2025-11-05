# models
from django.contrib.auth.models import AbstractUser
from django.db import models

USER_ROLES = (
    ('student', 'Student'),
    ('faculty', 'Faculty'),
)

class CustomUser(AbstractUser):
    role = models.CharField(max_length=10, choices=USER_ROLES, default='student')
    student_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    faculty_code = models.CharField(max_length=20, unique=True, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.username + " (" + self.get_role_display() + ")"



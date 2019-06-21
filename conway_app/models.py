from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class ConwayConfig(models.Model):
    title = models.CharField(max_length=200)
    board = ArrayField(ArrayField(models.BooleanField()))
    conway = models.BooleanField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateField('created', default=timezone.now)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created']
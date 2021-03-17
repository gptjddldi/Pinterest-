from django.db import models

from pin.models import Pin
from pinterestAccounts.models import Account


class Board(models.Model):
    author = models.ForeignKey(to=Account, on_delete=models.CASCADE, related_name='boards')
    title = models.CharField(max_length=100)
    pin = models.ManyToManyField(to=Pin, related_name='boards', blank=True)
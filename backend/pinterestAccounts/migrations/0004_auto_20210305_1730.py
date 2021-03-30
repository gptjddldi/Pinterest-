# Generated by Django 3.1.5 on 2021-03-05 08:30

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_auto_20210227_1523'),
        ('pinterestAccounts', '0003_auto_20210305_1656'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='followingTag',
        ),
        migrations.RemoveField(
            model_name='account',
            name='followingUser',
        ),
        migrations.AddField(
            model_name='account',
            name='following_tag',
            field=models.ManyToManyField(blank=True, related_name='following_tags', to='tags.Tag'),
        ),
        migrations.AddField(
            model_name='account',
            name='following_user',
            field=models.ManyToManyField(blank=True, related_name='following_users', to=settings.AUTH_USER_MODEL),
        ),
    ]
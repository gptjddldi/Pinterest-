# Generated by Django 3.1.5 on 2021-03-17 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_auto_20210227_1523'),
        ('pinterestAccounts', '0004_auto_20210305_1730'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='account',
            name='location',
        ),
        migrations.RemoveField(
            model_name='account',
            name='url',
        ),
        migrations.AlterField(
            model_name='account',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
        migrations.AlterField(
            model_name='account',
            name='following_tag',
            field=models.ManyToManyField(blank=True, related_name='users', to='tags.Tag'),
        ),
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
        migrations.AlterField(
            model_name='account',
            name='username',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]

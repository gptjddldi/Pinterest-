# Generated by Django 3.1.5 on 2021-03-17 01:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pinterestAccounts', '0005_auto_20210317_1047'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='account',
            options={},
        ),
        migrations.AlterModelManagers(
            name='account',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='account',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='account',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='account',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='account',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='account',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='account',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='account',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='account',
            name='user_permissions',
        ),
    ]

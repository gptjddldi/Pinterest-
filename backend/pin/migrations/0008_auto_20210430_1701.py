# Generated by Django 3.1.5 on 2021-04-30 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pin', '0007_auto_20210430_1658'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='pin',
            name='Pin_title_idx',
        ),
        migrations.AddIndex(
            model_name='pin',
            index=models.Index(fields=['title', 'id'], name='Pin_title_idx'),
        ),
    ]

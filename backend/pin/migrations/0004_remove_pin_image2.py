# Generated by Django 3.1.5 on 2021-02-25 11:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pin', '0003_pin_image2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pin',
            name='image2',
        ),
    ]

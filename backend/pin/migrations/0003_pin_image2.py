# Generated by Django 3.1.5 on 2021-02-25 10:26

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pin', '0002_pin_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin',
            name='image2',
            field=cloudinary.models.CloudinaryField(default=1, max_length=255, verbose_name='image'),
            preserve_default=False,
        ),
    ]

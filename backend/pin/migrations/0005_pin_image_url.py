# Generated by Django 3.1.5 on 2021-02-27 05:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pin', '0004_remove_pin_image2'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin',
            name='image_url',
            field=models.CharField(blank=True, max_length=400),
        ),
    ]
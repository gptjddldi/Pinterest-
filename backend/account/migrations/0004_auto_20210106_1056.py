# Generated by Django 3.1.5 on 2021-01-06 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_auto_20210105_1530'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='avatar',
            field=models.ImageField(blank=True, upload_to='account/profile/%Y/%m/%d'),
        ),
    ]

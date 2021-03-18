# Generated by Django 3.1.5 on 2021-02-22 02:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pin', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin',
            name='author',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='pins', to='pinterestAccounts.account'),
            preserve_default=False,
        ),
    ]

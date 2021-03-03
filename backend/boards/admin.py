from django.contrib import admin

from boards.models import Board


@admin.register(Board)
class TagAdmin(admin.ModelAdmin):
    list_display = ['title', 'author']
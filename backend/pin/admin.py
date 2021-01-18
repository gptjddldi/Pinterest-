from django.contrib import admin

from pin.models import Pin, Board


@admin.register(Pin)
class PinAdmin(admin.ModelAdmin):
    list_display = ['author', 'title', 'image', 'created_at']


@admin.register(Board)
class TagAdmin(admin.ModelAdmin):
    list_display = ['title']

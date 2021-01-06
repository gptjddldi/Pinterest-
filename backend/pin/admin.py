from django.contrib import admin

from pin.models import Pin, Tag


@admin.register(Pin)
class PinAdmin(admin.ModelAdmin):
    list_display = ['author', 'title', 'image', 'created_at']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['tag']

from django.contrib import admin

from pin.models import Pin


@admin.register(Pin)
class PinAdmin(admin.ModelAdmin):
    list_display = ['title', 'image', 'created_at']

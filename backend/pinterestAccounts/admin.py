from django.contrib import admin
from pinterestAccounts.models import Account, Board


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    class Meta:
        fields = ['__all__']


@admin.register(Board)
class TagAdmin(admin.ModelAdmin):
    list_display = ['title', 'author']
from django.contrib import admin

from account.models import Account


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    class Meta:
        fields = ['__all__']
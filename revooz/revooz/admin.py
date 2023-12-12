from django.contrib import admin
from .models import Page

class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'active')

# Register your models here.

admin.site.register(Page, PageAdmin)
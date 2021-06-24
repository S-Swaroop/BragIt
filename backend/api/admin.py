from django.contrib import admin
from .models import Comment, Post

# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
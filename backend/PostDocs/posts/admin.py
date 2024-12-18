from django.contrib import admin
from .models import Post, User, Comment,photo

admin.site.register(Post)

admin.site.register(User)

admin.site.register(Comment)

admin.site.register(photo)
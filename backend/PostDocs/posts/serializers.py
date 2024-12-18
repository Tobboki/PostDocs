from rest_framework import serializers
from .models import Post ,User, Comment,photo

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields=['id','title','content','user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'email']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'post','user']

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = photo
        fields ='__all__'


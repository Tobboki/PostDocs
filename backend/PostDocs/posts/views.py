from django.http import JsonResponse
from .models import Post, User, Comment
from .serializers import PostSerializer, UserSerializer, CommentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests

@api_view(['GET','POST'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True) 
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        serializer=PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET','PUT','DELETE'])
def post_detail(request,id):
    try:
        requested_post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response({"error": "Post Not Found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(requested_post)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = PostSerializer(requested_post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'DELETE':
        requested_post.delete()
        return Response({"detail": "Post Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
def User_list(request):
    if request.method == 'GET':
        Users = User.objects.all()
        serializer = UserSerializer(Users, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request,id):
    try:
        requested_user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response({"error": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(requested_user)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = UserSerializer(requested_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'DELETE':
        requested_user.delete()
        return Response({"detail": "User Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments,many=True) 
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        
@api_view(['GET', 'PUT', 'DELETE'])
def comment_detail(request,id):
    try:
        requested_comment = Comment.objects.get(pk=id)
    except:
        return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(requested_comment)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = CommentSerializer(requested_comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'DELETE':
        requested_comment.delete()
        return Response({"detail": "User Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)
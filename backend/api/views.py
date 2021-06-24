from datetime import timezone
from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from .utils import randompassword
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

# Create your views here.

@api_view(['GET'])
def post_list(request):
    post = Post.objects.all()
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response('Post does not exist', status=status.HTTP_404_NOT_FOUND)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response('Post does not exist', status=status.HTTP_404_NOT_FOUND)
    post.delete()
    return Response('Task deleted', status=status.HTTP_200_OK)

@api_view(['POST'])
def create(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        password = randompassword()
        while(True):
            try:
                x = Post.objects.get(password=password)
            except Post.DoesNotExist:
                x = None
            if x:
                password = randompassword()
            else:
                serializer.save(password=password, published_date = timezone.now())
                fmessage = f'Use this password for deleting or editting your just created Post- {password}'
                email = request.data['email']
                send_mail('Password for your post',fmessage, settings.EMAIL_HOST_USER,[email], fail_silently=False)
                break
        # serializer.object.published_date = timezone.now()
        # serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'

class PasswordSerializer(serializers.Serializer):
    password = serializers.IntegerField()
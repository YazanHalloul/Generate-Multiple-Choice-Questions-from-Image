from rest_framework import serializers
from .models import Image, Quiz, SchoolUser
from django.contrib.auth.hashers import make_password


class SchoolUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = SchoolUser
        fields = '__all__'

        
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
    context = serializers.CharField(required=False)
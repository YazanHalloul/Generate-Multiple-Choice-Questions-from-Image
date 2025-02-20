from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

class SchoolUser(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    teacherNumber = models.IntegerField(null=True, blank=True, unique=True)
    relatedTeacherNumber = models.IntegerField(null=True, blank=True)  # This field stores the teacher's id for student users; null for teachers

    def clean(self):
        if (self.teacherNumber is None and self.relatedTeacherNumber is None) or (self.teacherNumber is not None and self.relatedTeacherNumber is not None):
            raise ValidationError('Either teacherNumber or relatedTeacherNumber must be set, but not both.')

    def save(self, *args, **kwargs):
        self.clean()  
        if self.pk is None and self.password:
            self.password = make_password(self.password)
        super(SchoolUser, self).save(*args, **kwargs)

    def __str__(self):
        return self.username


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='images/')
    description = models.TextField()
    teacher = models.ForeignKey(SchoolUser, related_name='images', on_delete=models.CASCADE, limit_choices_to={'relatedTeacherNumber__isnull': True})

    def __str__(self):
        return f'Image {self.id}'


class Quiz(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255)
    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255)
    option4 = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    level_difficult = models.CharField(max_length=50)
    image = models.ForeignKey(Image, related_name='quizzes', on_delete=models.CASCADE)

    def __str__(self):
        return f'Quiz {self.id} - {self.question}'
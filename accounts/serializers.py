
from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'name', 'email', 'password', 'password2', 'role', 'student_id', 'faculty_code']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        
        if data.get('role') == 'student' and not data.get('student_id'):
            raise serializers.ValidationError({"student_id": "Student ID is required for students."})
        
        if data.get('role') == 'faculty' and not data.get('faculty_code'):
            raise serializers.ValidationError({"faculty_code": "Faculty Code is required for faculty."})
            
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
            student_id=validated_data.get('student_id'),
            faculty_code=validated_data.get('faculty_code'),
        )
        return user
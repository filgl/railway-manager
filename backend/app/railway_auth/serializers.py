import re

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    """
    This class represents the User model serializer.
    """

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        """
        This function validates the data.
        """

        if not data.get("email"):
            raise serializers.ValidationError({"email": "Email is required"})

        user_id = self.instance.id if self.instance else None
        if (
            data.get("email")
            and User.objects.filter(email=data.get("email"))
            .exclude(id=user_id)
            .exists()
        ):
            raise serializers.ValidationError({"email": "Email is already in use"})

        password = data.get("password")
        if password:
            if len(password) < 8:
                raise serializers.ValidationError(
                    {"password": "Password must be at least 8 characters long"}
                )
            if not re.search(r"[A-Z]", password):
                raise serializers.ValidationError(
                    {"password": "Password must contain at least one uppercase letter"}
                )
            if not re.search(r"[a-z]", password):
                raise serializers.ValidationError(
                    {"password": "Password must contain at least one lowercase letter"}
                )
            if not re.search(r"\d", password):
                raise serializers.ValidationError(
                    {"password": "Password must contain at least one digit"}
                )
            if not re.search(r"[£/=€_ç°§+!@#$%^&*(),.?\":{}|<>]", password):
                raise serializers.ValidationError(
                    {"password": "Password must contain at least one special character"}
                )

        return data

    def create(self, validated_data):
        """
        Creates a new user instance and a token for the user.
        """

        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

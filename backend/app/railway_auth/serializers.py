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
        This function validates the User model data.

        :param data: The data to validate.
        :return: The validated data.
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
            validate_password(password, "password")

        return data

    def create(self, validated_data):
        """
        This function creates a new user instance and a token for the user.

        :param validated_data: The validated data.
        :return: The created user instance.
        """

        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class PasswordResetSerializer(serializers.Serializer):
    """
    This class represents the Password reset serializer.
    """

    username = serializers.CharField()
    email = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        """
        This function validates the PasswordReset data.

        :param data: The data to validate.
        :return: The validated data.
        """

        user = data.get("username")
        email = data.get("email")

        try:
            user = User.objects.get(username=user)
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": "Invalid credentials"})

        if user.email != email:
            raise serializers.ValidationError({"email": "Invalid credentials"})

        new_password = data.get("new_password")
        if new_password:
            validate_password(new_password, "new_password")

        return data

    def save(self, **kwargs):
        """
        This function saves the new password.

        :return: The user with the new password.
        """

        user = User.objects.get(username=self.validated_data.get("username"))
        user.set_password(self.validated_data.get("new_password"))
        user.save()

        return user


def validate_password(password, password_field):
    """
    This function validates the password.

    :param password: The password to validate.
    :param password_field: The name of the password field if an error occurs.
    """

    if len(password) < 8:
        raise serializers.ValidationError(
            {password_field: "Password must be at least 8 characters long"}
        )
    if not re.search(r"[A-Z]", password):
        raise serializers.ValidationError(
            {password_field: "Password must contain at least one uppercase letter"}
        )
    if not re.search(r"[a-z]", password):
        raise serializers.ValidationError(
            {password_field: "Password must contain at least one lowercase letter"}
        )
    if not re.search(r"\d", password):
        raise serializers.ValidationError(
            {password_field: "Password must contain at least one digit"}
        )
    if not re.search(r"[£/=€_ç°§+!@#$%^&*(),.?\":{}|<>]", password):
        raise serializers.ValidationError(
            {password_field: "Password must contain at least one special character"}
        )

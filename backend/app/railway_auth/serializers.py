from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering a new user.
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

        if (
            data.get("email")
            and User.objects.filter(email=data.get("email"))
            .exclude(id=data.get("id"))
            .exists()
        ):
            raise serializers.ValidationError({"email": "Email is already in use"})

        return data

    def create(self, validated_data):
        """
        Creates a new user instance and a token for the user.
        """

        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

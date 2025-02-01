from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from railway_auth.serializers import RegisterSerializer
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    """
    This view is used to register a new user.
    """

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """
        This method is used to register a new user.
        """

        super().create(request, *args, **kwargs)
        user = authenticate(
            username=request.data.get("username"), password=request.data.get("password")
        )
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "username": user.username},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    """
    This view is used to log in a user.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        This method is used to log in a user.
        """

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Invalid login credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user is not None and not user.is_active:
            return Response(
                {"error": "User account is inactive"}, status=status.HTTP_403_FORBIDDEN
            )

        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})


class UserDetailView(APIView):
    """
    This view is used to retrieve a user's data.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        This method is used to retrieve a user's data.
        """

        user = request.user

        data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "is_active": user.is_active,
            "date_joined": user.date_joined,
        }

        return Response(data, status=status.HTTP_200_OK)

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from railway_auth.serializers import PasswordResetSerializer, UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(CreateAPIView):
    """
    This class represents the Register view.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        This function registers a new user.

        :param request: The request data.
        :return: The outgoing response.
        """

        super().create(request, *args, **kwargs)

        username = request.data.get("username").strip()

        user = authenticate(username=username, password=request.data.get("password"))
        token, created = Token.objects.get_or_create(user=user)

        return Response(
            {"token": token.key, "username": user.get_username()},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    """
    This class represents the Login view.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        This function logs in a user.

        :param request: The request data.
        :return: The outgoing response.
        """

        user = authenticate(
            username=request.data.get("username"), password=request.data.get("password")
        )

        if user is None:
            return Response(
                {"error": "Invalid login credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.get_username()})


class UserProfileView(APIView):
    """
    This class represents the UserProfile view.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        This function gets the user profile data.

        :param request: The request data.
        :return: The outgoing response.
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
            "date_joined": user.date_joined.strftime("%B %d, %Y, %I:%M %p"),
        }

        return Response(data, status=status.HTTP_200_OK)

    def put(self, request):
        """
        This function updates the user profile data.

        :param request: The request data.
        :return: The outgoing response.
        """

        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
        This function deletes the user profile.

        :param request: The request data.
        :return: The outgoing response.
        """

        user = request.user
        user.delete()

        return Response(
            {"message": "User delete successfully"}, status=status.HTTP_204_NO_CONTENT
        )


class PasswordResetView(APIView):
    """
    This class represents the PasswordReset view.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        This function sets a new password.

        :param request: The request data.
        :return: The outgoing response.
        """

        serializer = PasswordResetSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Password update successfully"}, status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from railway_auth.serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(CreateAPIView):
    """
    This view is used to register a new user.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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
            {"token": token.key, "username": user.get_username()},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    """
    This view is used to log in a user.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        This method is used to log in a user.
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
    This view handles get, put and delete for the user account.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        This method is used to get user profile data.
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

    def put(self, request):
        """
        This method is used to update  user profile data.
        """

        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
        This method is used to delete the user profile.
        """

        user = request.user
        user.delete()

        return Response(
            {"message": "User delete successfully"}, status=status.HTTP_204_NO_CONTENT
        )

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from railway_auth.serializers import RegisterSerializer
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    """
    This view is used to register a new user.
    """

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(APIView):
    """
    This view is used to log in a user.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        This method is used to log in a user.
        """

        print("siiiiiis: ", request.data)
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Invalid login credentialssss"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user is not None and not user.is_active:
            return Response(
                {"error": "User account is inactive"}, status=status.HTTP_403_FORBIDDEN
            )

        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})

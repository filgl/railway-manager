from django.urls import path
from railway_auth.views import (LoginView, PasswordResetView, RegisterView,
                                UserProfileView)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("password-reset/", PasswordResetView.as_view(), name="password_reset"),
]

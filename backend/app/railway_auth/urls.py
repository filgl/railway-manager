from django.urls import path
from railway_auth.views import (DeleteUserView, LoginView, RegisterView,
                                UserDetailView)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", UserDetailView.as_view(), name="profile"),
    path("delete/", DeleteUserView.as_view(), name="delete"),
]

from django.urls import path,include
from .views import CreateUserView, NoteListCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api/notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('api/notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
]
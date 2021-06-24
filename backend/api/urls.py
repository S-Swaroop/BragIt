from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/delete/<int:pk>/', views.delete, name='delete'),
    path('post/create/', views.create, name='create'),
]
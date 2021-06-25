from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/delete/<int:pk>/', views.delete, name='delete'),
    path('post/create/', views.create, name='create'),
    path("post/edit/<int:pk>/", views.edit, name="edit"),
    path("search/<str:x>/", views.search, name="search"),
    path("post/verify/<int:pk>/", views.password, name="verify"),
    path("post/comment/<int:pk>/", views.comment, name="comment"),
] 
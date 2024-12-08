"""
URL configuration for PostDocs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from posts import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/<int:id>',views.post_detail),
    path('posts/',views.post_list),
    
    path('users/<int:id>',views.user_detail),
    path('users/',views.User_list),

    path('comments/<int:id>',views.comment_detail),
    path('comments/',views.comment_list),
    path('api/',include('authentication.urls'))
    
]

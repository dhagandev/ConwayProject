from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('accounts/signup', views.signup, name='signup'),
    path('rules/', views.rules, name='rules'),
    path('sim/create/', views.consim_create, name='create'),
    path('sim/<int:consim_id>/', views.consim_detail, name='detail'),
    path('users/<int:user_id>/', views.user_profile, name='profile'),

    path('sim/save/', views.save_config)
]
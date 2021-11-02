"""unionGov URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.db import router
from django.urls import include, path
from gov import views
from rest_framework import routers

PATH = '/img'
ROOT = settings.BASE_DIR / 'img/'

router = routers.DefaultRouter()
router.register(r'candidates', views.CandidateAPIView, 'candidates')
router.register(r'configs', views.ConfigAPIView, 'configs')
router.register(r'governments', views.GovernmentAPIView, 'configrefs')
router.register(r'users', views.UserAPIView, 'users')
router.register(r'positions', views.PositionAPIView, 'positions')

urlpatterns = [
    path('', include(router.urls)),
    path('gov/', include('gov.urls')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
] + static(PATH, document_root=ROOT)

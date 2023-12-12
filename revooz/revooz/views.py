from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PageSerializer
from .models import Page

def hello_world(request):
    return HttpResponse("psyHello, World!")


# Create your views here.

class PageView(viewsets.ModelViewSet):
    serializer_class = PageSerializer
    queryset = Page.objects.all()
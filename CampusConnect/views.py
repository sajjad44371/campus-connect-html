from django.http import HttpResponse
from django.shortcuts import render

def homePage (request):
    return render(request, "index.html")

def studentDashboard (request):
    return render(request, "studentDashboard.html")

def requestForm (request):
    return render(request, "requestForm.html")
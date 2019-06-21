from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import User, ConwayConfig
from django.http import HttpResponse

# Create your views here.
def home(request):
	return render(request, 'home.html')

def rules(request):
	return render(request, 'rules.html')

def consim_create(request):
	return render(request, 'consim/createconsim.html')

def consim_detail(request):
	return render(request, 'consim/viewconsim.html')

def user_profile(request, user_id):
	user = User.objects.get(id=user_id)
	return render(request, 'registration/profile.html', {'user': user})

def signup(request):
	error_message = ''
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
	if form.is_valid():
		user = form.save()
		login(request, user)
		return redirect('/')
	else:
		error_message = 'Invalid sign up - try again'
	form = UserCreationForm()
	context = {'form': form, 'error_message': error_message}
	return render(request, 'registration/signup.html', context)

def save_config(request):
	if request.method == 'POST':
		config = ConwayConfig.objects.get()
		config.title = request.POST['title']
		config.board = request.POST['board']
		config.conway = request.POST['conway']
		config.owner = request.POST['owner']
		config.save()
	return HttpResponse('successfully created config')

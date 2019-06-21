from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import User, ConwayConfig
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

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

@csrf_exempt
def save_config(request):
	if request.method == 'POST':
		print("What is request post?")
		print(request.POST)

		keys = []
		grid = []
		for key in request.POST:
			if "board" in key:
				print(key)
				print(request.POST[key])
				keys.append(key)
			row = []
			for ele in keys:
				row.append(ele)
			grid.append(row)



		print(grid)
		print("end of grid")

		config = ConwayConfig.objects.create(
			title = request.POST['title'],
			board = request.POST['board'],
			conway = request.POST['conway'],
			# owner = request.POST['owner']
		)
		config.save()
	return HttpResponse('successfully created config')

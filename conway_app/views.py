from django.shortcuts import render

# Create your views here.
def home(request):
	return render(request, 'home.html')

def rules(request):
	return render(request, 'rules.html')

def consim_create(request):
	return render(request, 'consim/createconsim.html')

def consim_detail(request):
	return render(request, 'consim/viewconsim.html')

def user_profile(request):
	user = User.objects.get(id=user_id)
	return render(request, 'users/profile.html', {'user': user})
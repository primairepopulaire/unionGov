from django.contrib import admin

# Register your models here.
from .models import User, Government, Candidate, Position, Config

admin.site.register(User)
admin.site.register(Government)
admin.site.register(Candidate)
admin.site.register(Position)
admin.site.register(Config)

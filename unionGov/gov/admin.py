from django.contrib import admin

# Register your models here.
from .models import User, ConfigRef, Candidate, Position, Config

admin.site.register(User)
admin.site.register(ConfigRef)
admin.site.register(Candidate)
admin.site.register(Position)
admin.site.register(Config)

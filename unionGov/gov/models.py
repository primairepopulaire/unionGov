from django.db import models
from django.utils.crypto import get_random_string

def get_new_ref():
    """ Generate a new config ref """
    return get_random_string(length=32)

# Create your models here.
class User(models.Model):
    email_address = models.EmailField()
    first_name = models.CharField(max_length=32, default="")
    last_name = models.CharField(max_length=32, default="")

class ConfigRef(models.Model):
    # long enough random string, to be set at generation
    config_ref = models.CharField(max_length=32, default=get_new_ref(), unique=True)
    save_date = models.DateTimeField('date saved')
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return "{} on {}".format(self.config_ref, self.save_date)

class Candidate(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    image_url = models.ImageField()

    def __str__(self) -> str:
        return "{} {}".format(self.first_name, self.last_name)

class Position(models.Model):
    position_name = models.CharField(max_length=32)

    def __str__(self) -> str:
        return self.position_name

class Config(models.Model):
    config_ref = models.ForeignKey(ConfigRef, on_delete=models.PROTECT)
    position = models.ForeignKey(Position, on_delete=models.PROTECT)
    candidate = models.ForeignKey(Candidate, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return "Config {}: {} pour {}".format(self.config_ref, self.candidate, self.position)

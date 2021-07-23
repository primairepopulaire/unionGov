from datetime import datetime
import pytz
from django.test import TestCase
from django.core.exceptions import ValidationError

from .models import Candidate, Position, ConfigRef, Config
# Create your tests here.

class ConfigModelTests(TestCase):
    fixtures = ['gov.yaml']

    def test_duplicate_candidate(self):
        """ saving a config with a duplicate candidate """
        with self.assertRaises(ValidationError):
            current_conf_ref = ConfigRef.objects.get(pk=1)
            melanchon = Candidate.objects.get(pk=4)
            justice = Position.objects.get(pk=4)

            new_config = Config.objects.create(config_ref=current_conf_ref, 
                                                position=justice, 
                                                candidate=melanchon)

    def test_duplicate_position(self):
        """ saving a config with a duplicate position """
        with self.assertRaises(ValidationError):
            current_conf_ref = ConfigRef.objects.get(pk=1)
            piolle = Candidate.objects.get(pk=6)
            prem_min = Position.objects.get(pk=2)

            new_config = Config.objects.create(config_ref=current_conf_ref, 
                                                position=prem_min, 
                                                candidate=piolle)

    def test_adding_config_to_ref(self):
        """ Saving a new config should be possible """
        current_conf_ref = ConfigRef.objects.get(pk=1)
        piolle = Candidate.objects.get(pk=6)
        justice = Position.objects.get(pk=4)

        list_conf = Config.objects.filter(config_ref=current_conf_ref)

        new_config = Config(config_ref=current_conf_ref, 
                            position=justice, 
                            candidate=piolle)

        new_config.save()

        # Check suitable number of rows in config
        list_conf = Config.objects.filter(config_ref=current_conf_ref)
        self.assertEqual(len(list_conf), 4)

    def test_adding_to_new_ref(self):
        """ Saving a new config should be possible """
        # here and now
        here = pytz.timezone("Europe/Paris")
        now = datetime.now(tz=here)

        new_conf_ref = ConfigRef.objects.create(save_date=now)
        piolle = Candidate.objects.get(pk=6)
        justice = Position.objects.get(pk=4)

        new_config = Config(config_ref=new_conf_ref, 
                            position=justice, 
                            candidate=piolle)

        new_config.save()

        # Check suitable number of rows in config
        list_conf = Config.objects.filter(config_ref=new_conf_ref)
        self.assertEqual(len(list_conf), 1)

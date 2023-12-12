from django.db import models

# Create your models here.

class Page(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    active = models.BooleanField(default=True)

    def _str_(self):
        return self.title
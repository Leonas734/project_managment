# Generated by Django 3.2.9 on 2021-11-11 23:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_projecttask_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projecttask',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_creator', to=settings.AUTH_USER_MODEL),
        ),
    ]
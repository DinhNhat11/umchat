# Generated by Django 5.1.3 on 2024-12-17 05:58

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0016_alter_friend_id_alter_friendrequest_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatroom',
            name='public_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='public_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
# Generated by Django 5.1.3 on 2024-12-17 03:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0010_remove_friend_accepted_remove_friend_receiver_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='friend_requests',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='friends',
        ),
        migrations.AlterField(
            model_name='friend',
            name='user1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_1', to='chat.userprofile'),
        ),
        migrations.AlterField(
            model_name='friend',
            name='user2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_2', to='chat.userprofile'),
        ),
        migrations.AlterField(
            model_name='friendrequest',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received', to='chat.userprofile'),
        ),
        migrations.AlterField(
            model_name='friendrequest',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent', to='chat.userprofile'),
        ),
        migrations.AlterUniqueTogether(
            name='friend',
            unique_together={('user1', 'user2')},
        ),
        migrations.AlterUniqueTogether(
            name='friendrequest',
            unique_together={('sender', 'receiver')},
        ),
    ]

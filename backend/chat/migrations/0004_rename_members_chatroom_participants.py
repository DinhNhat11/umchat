# Generated by Django 5.1.3 on 2024-11-15 09:20

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("chat", "0003_alter_chatroom_name"),
    ]

    operations = [
        migrations.RenameField(
            model_name="chatroom",
            old_name="members",
            new_name="participants",
        ),
    ]

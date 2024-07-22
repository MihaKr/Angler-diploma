import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync

class AnglerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'angler_log'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def angler_log_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
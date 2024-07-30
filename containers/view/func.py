import os
import requests

app_cont_id=os.getenv('APP_CONT_ID', '0')

url = f'http://backend:8000/angler_core/files?app_cont_id={app_cont_id}'
payload = {'store':2, 'app_container_id': app_cont_id}
print(payload)
files = {'file': open('/mnt/angler_store/into_text.conllu','rb')}
response = requests.post(url, files=files, data=payload)
print(response)
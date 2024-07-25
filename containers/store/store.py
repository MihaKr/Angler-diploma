import requests

url = 'http://backend:8000/angler_core/files?app_cont_id=49'
payload = {'store':1, 'app_container_id': 49}
files = {'file': open('/mnt/angler_store/into_text.conllu','rb')}
response = requests.post(url, files=files, data=payload)
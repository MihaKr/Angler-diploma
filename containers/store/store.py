import json
import os
import requests
import conllu

app_cont_id=os.getenv('APP_CONT_ID', '0')
filepath = os.environ['FILEPATH_ENV']
filetype = os.environ['FILETYPE']

print(filetype)


url = f'http://backend:8000/angler_core/files?app_cont_id={app_cont_id}'
payload = {'store':1, 'app_container_id': app_cont_id, 'store_as': filepath, 'filetype': filetype}
files={}

if filetype == 'Conllu':
    files = {'file': open('/mnt/angler_store/into_text.conllu','rb')}
elif filetype == 'JSON':
    with open('/mnt/angler_store/into_text.conllu', 'r', encoding='utf-8') as f:
        conllu_data = f.read()

    sentences = conllu.parse(conllu_data)
    json_data = [sentence.serialize() for sentence in sentences]
    files = {'file':  json.dumps(json_data)}

response = requests.post(url, files=files, data=payload)
print(response)
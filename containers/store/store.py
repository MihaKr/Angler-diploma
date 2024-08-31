import json
import os
import requests
import conllu

app_cont_id = os.getenv('APP_CONT_ID', '0')
filepath = os.environ.get('FILEPATH_ENV', '/mnt/angler_store/into_text.conllu')
filetype = os.environ.get('FILETYPE', 'Conllu')

print(filetype)

url = f'http://host.docker.internal:8000/angler_core/files?app_cont_id={app_cont_id}'

payload = {'store': 1, 'app_container_id': app_cont_id, 'store_as': filepath, 'filetype': filetype}
files = {}

if filetype == 'Conllu':
    # Opening the Conllu file
    files = {'file': open('/mnt/angler_store/into_text.conllu', 'rb')}
elif filetype == 'JSON':
    # Parsing the Conllu data and converting it to JSON
    with open('/mnt/angler_store/into_text.conllu', 'r', encoding='utf-8') as f:
        conllu_data = f.read()

    sentences = conllu.parse(conllu_data)
    json_data = [sentence.serialize() for sentence in sentences]

    # Save the JSON data to a temporary file to simulate file upload
    with open('/mnt/angler_store/temp_data.json', 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file)

    # Reopen the temporary JSON file to attach to the request
    files = {'file': open('/mnt/angler_store/temp_data.json', 'rb')}

response = requests.post(url, files=files, data=payload)

# Close any opened files to free resources
if 'file' in files and not files['file'].closed:
    files['file'].close()

print(response)

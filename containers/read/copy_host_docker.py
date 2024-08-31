import os

import requests

def save_to_file(content, output_path):
    file_name = output_path
    f = open(file_name, 'w+')  # open file in write mode
    f.write(content["file_content"])
    f.close()

app_cont_id=os.getenv('APP_CONT_ID', '0')

#url = f'http://0.0.0.0:8000/angler_core/files?app_cont_id={app_cont_id}'
url = f'http://host.docker.internal:8000/angler_core/files?app_cont_id={app_cont_id}'

response = requests.get(url)

data = response.json()
save_to_file(data, '/mnt/angler_store/into_text.txt')
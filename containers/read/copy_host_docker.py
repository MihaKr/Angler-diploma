import requests

def save_to_file(content, output_path):
    file_name = output_path
    f = open(file_name, 'w+')  # open file in write mode
    f.write(content["file_content"])
    f.close()

url = 'http://backend:8000/angler_core/files?app_cont_id=6'
payload = {'app_container_id': 'value1', 'key2': 'value2'}
response = requests.get(url)

data = response.json()
save_to_file(data, '/mnt/angler_store/into_text.txt')
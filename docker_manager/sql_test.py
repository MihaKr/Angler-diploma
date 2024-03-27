import os
import sys
import time
import django
import docker
client = docker.from_env()

sys.path.append(os.path.abspath('../angler_backend'))  # Adjust the path as needed
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'angler_backend.settings')

django.setup()
from angler_core.models import LinkContainers, ApplicationContainers, AllContainers

client.volumes.create(name='angler_store', driver='local')

mount_path = "/mnt/my_volume"
host_dir = os.path.abspath("../docker_host")
container_dir = "/mnt/host"

def getLinks(app_id):
    links= {}
    all_cont = []

    LinkContainers_obj = LinkContainers.objects.filter(app_id_link=app_id)
    for obj in LinkContainers_obj:
        links[obj.origin] = obj.destination
        if obj.origin not in all_cont:
            all_cont.append(obj.origin)
        if obj.destination not in all_cont:
            all_cont.append(obj.destination)

    return links, all_cont

def getAppContainers(list_cont):
    container_ids = []
    ApplicationContainers_obj = ApplicationContainers.objects.filter(app_container_id__in=list_cont)

    for obj in ApplicationContainers_obj:
        container_ids.append(obj.container_id)

    return container_ids

def getContainerName(list_cont):
    container_names = []
    AllContainers_obj = AllContainers.objects.filter(container_id__in=list_cont).order_by('container_id')

    for obj in AllContainers_obj:
        container_names.append(obj.container_name)

    return container_names

def build_images(list_cont):
    images = {}
    for i in list_cont:
        read_path = os.path.abspath(os.path.join("../containers", i))
        images[i] = client.images.build(path=read_path, tag=i)

    return images


def run_containers(list_img):
    list = []
    for container_name, image in list_img.items():
        time.sleep(1)
        x = client.containers.run(
            image[0],
            detach=True,
            volumes={
                host_dir: {"bind": container_dir, "mode": "rw"},
                "angler_store": {"bind": "/mnt/angler", "mode": "rw"}
            },
        )


def delete_cont(list_cont):
    client.containers.prune(list_cont)

def run_app_func():
    a,b = getLinks(8)
    print(a)
    print(b)
    c = getAppContainers(b)
    print (c)

    d = getContainerName(c)
    print(d)

    e = build_images(d)

    print(e)

    run_containers(e)
    '''LinkContainers_obj = LinkContainers.objects.all()
    ApplicationContainers_obj = ApplicationContainers.objects.all()
    AllContainers_obj = AllContainers.objects.all()'''


#TODO: DODAJ ZA BRISANJE
#TODO: DODAJ ZA CHECK CE JE PREJSNJI V VERIGI USTAVU
#TODO: SORTIRAJ PO VERIGI
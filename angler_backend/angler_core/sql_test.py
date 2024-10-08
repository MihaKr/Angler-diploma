import os
import sys
import time
from datetime import datetime

import django
import docker
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

client = docker.from_env() #get docker 

sys.path.append(os.path.abspath('..'))  # Adjust the path as needed
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'angler_backend.settings')

django.setup()
from angler_core.models import LinkContainers, ApplicationContainers, AllContainers

client.volumes.create(name='angler_store', driver='local') #if not exists create file storage

mount_path = "/mnt/my_volume" #storage configurations
host_dir = os.path.abspath("/mnt/docker_host")
host_containers = os.path.abspath("../containers")
container_dir = "/mnt/host"
container_guest_dir = "/mnt/containers"


def getLinks(app_id): 
    links= {}
    all_cont = []

    LinkContainers_obj = LinkContainers.objects.filter(app_id=app_id) #get all connections for specified app
    for obj in LinkContainers_obj:
        links[obj.origin] = obj.destination
        if obj.origin not in all_cont:
            all_cont.append(obj.origin)
        if obj.destination not in all_cont:
            all_cont.append(obj.destination)

    all_cont.sort()

    return links, all_cont

def getAppContainers(list_cont):
    container_ids = {}
    index_sort = {}
    c = 0
    for i in list_cont:
        ApplicationContainers_obj = ApplicationContainers.objects.filter(app_container_id=i)
        for obj in ApplicationContainers_obj:
            container_ids[c] = {obj.container_id: obj.arguments} #get all containers and their arguments
            #container_ids[obj.container_id] = obj.arguments
            c += 1
    return container_ids

def getContainerName(list_cont):
    container_names = {}

    for i in list_cont:
        AllContainers_obj = AllContainers.objects.filter(container_id__in=list_cont[i]) 

        for obj in AllContainers_obj:
            for arg in list_cont[i]:
                if arg == obj.container_id:
                    container_names[obj.container_name] = list_cont[i][arg]

    return container_names

def build_images(list_cont):
    channel_layer = get_channel_layer()
    images = {}
    for i in list_cont:
        read_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../containers', i))
        #read_path = os.path.join('/mnt/containers', i)
        print(f"Reading path for container {i}: {read_path}")
        images[i], logs = client.images.build(path=str(read_path), tag=i, buildargs=list_cont[i]) #build image with arguments

        for chunk in logs:
            if 'stream' in chunk:
                for line in chunk['stream'].splitlines():
                    '''async_to_sync(channel_layer.group_send)(
                        'angler_log',
                        {
                            'type': 'angler_log_message',
                            'message': '[' + datetime.now().strftime("%m/%d/%Y %H:%M:%S") + '] ' + line
                        }
                    )'''
    return images


def run_containers(list_img):
    list = []
    channel_layer = get_channel_layer()
    for container_name, image in list_img.items(): #run all containrts with linked volume and network
            x = client.containers.run(
                image,
                detach=True,
                volumes={
                    'angler_store': {'bind': '/mnt/angler_store', 'mode': 'rw'}
                },
                network='Angler_net',
            )
            list.append(x)
            container = client.containers.get(x.id)
            while container.status != 'exited': #run next container only if previous one exited 
                abc = container.logs().decode('utf-8')
                if 'abc_old' in locals():
                    if abc != abc_old:
                        '''async_to_sync(channel_layer.group_send)(
                            'angler_log',
                            {
                                'type': 'angler_log_message',
                                'message': '[' + datetime.now().strftime("%m/%d/%Y %H:%M:%S") + '] ' + abc
                            }
                        )'''
                else:
                        '''                    async_to_sync(channel_layer.group_send)(
                        'angler_log',
                        {
                            'type': 'angler_log_message',
                            'message': '[' + datetime.now().strftime("%m/%d/%Y %H:%M:%S") + '] ' + abc
                        }
                    )'''
                time.sleep(2)
                abc_old = container.logs().decode('utf-8')  
                container.reload()


    return list


def delete_cont(list_cont):
    for i in list_cont:
        i.remove(force=True)

def run_app_func(id):
    start = time.time()
    print(start)
    #channel_layer = get_channel_layer()

    '''async_to_sync(channel_layer.group_send)(
        'angler_log',
        {
            'type': 'angler_log_message',
            'message': '[' + datetime.now().strftime("%m/%d/%Y %H:%M:%S") + '] ' + 'RUN STARTED'
        }
    )'''

    a,b = getLinks(id) #
    print(a)
    print(b)
    c = getAppContainers(b) #get all containers that will be run in app
    print (c)

    d = getContainerName(c) #get all container source files
    print(d)

    e = build_images(d) #build containe images

    print(e)

    list_of_run = run_containers(e) #run images
    print(list_of_run)

    delete_cont(list_of_run) #delete containers

    #end = time.time()
    #length = end - start

    '''async_to_sync(channel_layer.group_send)(
        'angler_log',
        {
            'type': 'angler_log_message',
            'message': '[' + datetime.now().strftime("%m/%d/%Y %H:%M:%S") + '] ' + 'RUN FINISHED'
        }
    )

   async_to_sync(channel_layer.group_send)(
        'angler_log',
        {
            'type': 'angler_log_message',
            'message': '[' + datetime.now().strftime("%m/%d/%Y %H:%M:%S") + '] ' + 'TIME TAKEN: ' + str(length) + ' seconds'
        }
    )'''


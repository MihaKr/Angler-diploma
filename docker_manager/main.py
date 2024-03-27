import os

import docker

client = docker.from_env()

client.volumes.create(name='angler_store', driver='local')

mount_path = "/mnt/my_volume"  # Mount path inside the container

host_dir = os.path.abspath("../docker_host")
container_dir = "/mnt/host"

read_path = "../containers/read/"
read_image, _ = client.images.build(path=read_path, tag="read")

read = client.containers.run(
    read_image,
    detach=True,  # Run the container in the background
    volumes={
        host_dir: {"bind": container_dir, "mode": "rw"},
        "angler_store": {"bind": "/mnt/angler", "mode": "rw"}
    },
    # Add any additional options here if needed
)

#Store

'''store_path = "../../containers/store/"
store_image, _ = client.images.build(path=store_path, tag="read")'''

'''store = client.containers.run(
    store_image,
    detach=True,  # Run the container in the background
    volumes={
        host_dir: {"bind": container_dir, "mode": "rw"},
        "angler_store": {"bind": "/mnt/angler", "mode": "rw"}
    },
    # Add any additional options here if needed
)'''


#client.volumes.prune('angler_store')

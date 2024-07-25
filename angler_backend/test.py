import docker
client = docker.from_env()

client.images.build(path='/mnt/containers/read', tag='read')



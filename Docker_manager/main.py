import docker

client = docker.from_env()
client.containers.run("bfirsh/reticulate-splines", detach=True)

list = client.containers.list()

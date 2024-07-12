#create new folder with name
#copy over dockerfile and script
import os
import shutil

def run_add_new_container(name, original_path):
    parent_dir = "../containers"
    config_dir = "../frontend/app/configs"

    config_src = os.path.join(original_path, 'config.tsx')
    config_path = os.path.join(config_dir, name)

    path = os.path.join(parent_dir, name)
    os.mkdir(path)
    shutil.copytree(original_path, path, dirs_exist_ok=True)
    shutil.copyfile(config_src, config_path)

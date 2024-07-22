import os
import pickle
import stanza
import sys


def pickle_to_txt(pickle_file_path, txt_file_path):
    # Load data from pickle file
    with open(pickle_file_path, 'rb') as pickle_file:
        data = pickle.load(pickle_file)

    data_str = str(data)

    with open(txt_file_path, 'w') as txt_file:
        txt_file.write(data_str)


# Example usage
print(os.environ['FILEPATH_ENV'])
pickle_file_path = '/mnt/angler/into_text.pkl'
txt_file_path = 'data.txt'
pickle_to_txt(pickle_file_path, '/mnt/host/' +os.environ['FILEPATH_ENV'] + '.txt')
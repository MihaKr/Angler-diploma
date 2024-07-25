import stanza
import pickle
from stanza.utils.conll import CoNLL

def read_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return content

def save_to_file(content, output_path):
    with open(output_path, 'wb') as file:
         pickle.dump(content, file)

def tokenize_stanza(text):
    nlp_tokenized = stanza.Pipeline(lang='en', processors='tokenize', tokenize_pretokenized=True)
    tokenized_text = nlp_tokenized(text)
    return tokenized_text

file = read_file('/mnt/angler_store/into_text.txt')
tokenized_text_f = tokenize_stanza(file)
#dicts = tokenized_text_f.to_dict()
CoNLL.write_doc2conll(tokenized_text_f, "/mnt/angler_store/into_text.conllu")

#save_to_file(dicts, '/mnt/angler/into_text.pkl')

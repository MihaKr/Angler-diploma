import stanza
from stanza import Document
import pickle
from stanza.utils.conll import CoNLL
import os


def read_file(file_path):
    with open(file_path, 'rb') as file:
        return pickle.load(file)

def save_to_file(content, output_path):
    with open(output_path, 'wb') as file:
         pickle.dump(content, file)

def tokenize_stanza(text, app_cont_id):
    nlp_tokenized = stanza.Pipeline(lang=app_cont_id, processors='tokenize, pos', tokenize_pretokenized=True)
    tokenized_text = nlp_tokenized(text)
    return tokenized_text

#file = read_file('/mnt/angler/into_text.pkl')
#doc = Document(file)
app_cont_id=os.getenv('LANG', 'en')

doc = CoNLL.conll2doc("/mnt/angler_store/into_text.conllu")
tokenized_text_f = tokenize_stanza(doc, app_cont_id)
CoNLL.write_doc2conll(tokenized_text_f, "/mnt/angler_store/into_text.conllu")
#save_to_file(tokenized_text_f.sentences, '/mnt/angler/into_text.pkl')


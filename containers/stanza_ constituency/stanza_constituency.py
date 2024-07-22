import stanza
from stanza import Document
import pickle
from stanza.utils.conll import CoNLL
def read_file(file_path):
    with open(file_path, 'rb') as file:
        return pickle.load(file)

def save_to_file(content, output_path):
    with open(output_path, 'wb') as file:
         pickle.dump(content, file)

def lemma_constituency(text):
    nlp_depparse = stanza.Pipeline(lang='en', processors='tokenize,pos,constituency', tokenize_pretokenized=True)
    tokenized_text = nlp_depparse(text)
    return tokenized_text

#file = read_file('/mnt/angler/into_text.pkl')
#doc = Document(file)
doc = CoNLL.conll2doc("/mnt/angler/into_text.conllu")
tokenized_text_f = lemma_constituency(doc)
#save_to_file(tokenized_text_f.sentences, '/mnt/angler/into_text.pkl')
CoNLL.write_doc2conll(tokenized_text_f, "/mnt/angler/into_text.conllu")

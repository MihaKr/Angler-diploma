import stanza

def read_file(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file]

def save_to_file(content, output_path):
    with open(output_path, 'w') as file:
        for item in content:
            file.write(f"{item}\n")

def lemma_constituency(text):
    nlp_depparse = stanza.Pipeline(lang='en', processors='tokenize,pos,constituency', tokenize_pretokenized=True)
    tokenized_text = nlp_depparse(text)
    return tokenized_text

file = read_file('/mnt/angler/into_text.txt')
tokenized_text_f = lemma_constituency(file)
save_to_file(tokenized_text_f.sentences, '/mnt/angler/into_text.txt')

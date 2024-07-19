import stanza

def read_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return content

def save_to_file(content, output_path):
    with open(output_path, 'w') as file:
        for item in content:
            file.write(f"{item}\n")

def tokenize_stanza(text):
    nlp_tokenized = stanza.Pipeline(lang='en', processors='tokenize', tokenize_pretokenized=True)
    tokenized_text = nlp_tokenized(text)
    return tokenized_text

file = read_file('/mnt/angler/into_text.txt')
tokenized_text_f = tokenize_stanza(file)
print(tokenized_text_f)
save_to_file(tokenized_text_f.sentences, '/mnt/angler/into_text.txt')


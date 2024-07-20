import stanza

def read_file(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file]

def save_to_file(content, output_path):
    with open(output_path, 'w') as file:
        for item in content:
            file.write(f"{item}\n")

def sentiment_stanza(text):
    nlp_sentiment = stanza.Pipeline(lang='en', processors='tokenize,sentiment', tokenize_pretokenized=True)
    tokenized_text = nlp_sentiment(text)
    return tokenized_text

file = read_file('/mnt/angler/into_text.txt')
tokenized_text_f = sentiment_stanza(file)
save_to_file(tokenized_text_f.sentences, '/mnt/angler/into_text.txt')


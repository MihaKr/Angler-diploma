import classla
import json
classla.download('sl')

class Tokenizer:
    def __init__(self, lang='sl', type='standard'):
        self.nlp = classla.Pipeline(lang, processors='tokenize', type=type)

    def tokenize(self, text):
        doc = self.nlp(text)
        return doc

# Example usage
if __name__ == "__main__":
    output_file = '/mnt/angler/splitted.txt'
    tokenizer = Tokenizer()
    text = "France Prešeren je rojen v Vrbi."
    tokenized_doc = tokenizer.tokenize(text)
    print(tokenized_doc)

    tokens = []
    for sentence in tokenized_doc.sentences:
        sentence_tokens = []
        for token in sentence.tokens:
            token_dict = {"id": token.id, "text": token.text}
            if token.misc:
                token_dict["misc"] = token.misc
            sentence_tokens.append(token_dict)
        tokens.append(sentence_tokens)

    # Add metadata
    metadata = f"# newpar id = 1\n# sent_id = 1.1\n# text = {text}\n"

    # Create the final structure
    final_output = [tokens, metadata]

    try:
        with open(output_file, 'w') as file:
            json.dump(final_output, file, indent=2, ensure_ascii=False)
        print(f"Words added to '{output_file}' successfully.")
    except Exception as e:
        print(f"Error occurred while writing to '{output_file}': {e}")
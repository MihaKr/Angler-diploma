def add_words_to_file(input_file, output_file, words_to_add):
    try:
        with open(input_file, 'r') as file:
            content = file.read()
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
        return

    content += "\n" + " ".join(words_to_add)

    try:
        with open(output_file, 'w') as file:
            file.write(content)
        print(f"Words added to '{output_file}' successfully.")
    except Exception as e:
        print(f"Error occurred while writing to '{output_file}': {e}")


# Example usage:
input_file = '/mnt/angler/test_docker.txt'
output_file = '/mnt/angler/splitted.txt'
words_to_add = ["dodali smo to besedilo in vrnili na host"]

add_words_to_file(input_file, output_file, words_to_add)


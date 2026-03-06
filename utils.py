import hashlib
import os

def generate_hash(filepath):

    sha256 = hashlib.sha256()

    with open(filepath, "rb") as f:
        while True:
            data = f.read(65536)
            if not data:
                break
            sha256.update(data)

    return sha256.hexdigest()


def save_image(file, upload_folder):

    filepath = os.path.join(upload_folder, file.filename)
    file.save(filepath)

    return filepath

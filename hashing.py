import hashlib

def generate_hash(image_path):

    sha256 = hashlib.sha256()

    with open(image_path, "rb") as f:
        sha256.update(f.read())

    return sha256.hexdigest()

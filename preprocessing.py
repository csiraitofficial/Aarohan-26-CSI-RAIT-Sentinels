import cv2

def preprocess_image(image_path):

    image = cv2.imread(image_path)

    h, w = image.shape[:2]

    max_size = 512

    if h > w:
        new_h = max_size
        new_w = int(w * (max_size / h))
    else:
        new_w = max_size
        new_h = int(h * (max_size / w))

    image = cv2.resize(image, (new_w, new_h))

    return image

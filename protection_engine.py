import cv2
import numpy as np

def protect_image(image):

    # small gaussian noise
    noise = np.random.normal(0, 2, image.shape)

    protected = image + noise

    protected = np.clip(protected, 0, 255).astype(np.uint8)

    return protected

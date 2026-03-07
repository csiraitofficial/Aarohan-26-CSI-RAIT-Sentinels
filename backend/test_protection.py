import torch
from torchvision import models, transforms
from PIL import Image

# Load pre-trained classifier
model = models.resnet50(pretrained=True)
model.eval()

# Preprocessing
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def predict(image_path):
    img = Image.open(image_path).convert("RGB")
    input_tensor = preprocess(img).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
    _, pred = torch.max(output, 1)
    return pred.item()

orig_label = predict("uploads/original_image.png")
protected_label = predict("uploads/protected_image.png")

print("Original label:", orig_label)
print("Protected label:", protected_label)

if orig_label != protected_label:
    print("✅ The protected image resists manipulation!")
else:
    print("⚠️ The protected image might still be vulnerable.")
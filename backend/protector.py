import torch
import torchvision.transforms as T
import torchvision.models as models
from torchattacks import PGD
from PIL import Image
import io

# Load model and move to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.resnet50(pretrained=True).to(device).eval()

def protect_image(input_image_bytes):
    # 1. Load Image
    img = Image.open(io.BytesIO(input_image_bytes)).convert("RGB")
    original_size = img.size
    
    # 2. Stronger Pre-processing
    transform = T.Compose([
        T.Resize((224, 224)),
        T.ToTensor()
    ])
    img_tensor = transform(img).unsqueeze(0).to(device)

    # 3. Enhanced PGD Protection
    # Increase eps to 16/255 or 32/255 for better defense against manipulation
    # steps=20 makes the 'invisible' shield more complex for attackers to bypass
    atk = PGD(model, eps=16/255, alpha=2/255, steps=20)
    
    # We use a 'Targeted' approach: force the image to look like a specific 
    # incorrect class (e.g., class 500) to the AI's latent space
    target_labels = torch.tensor([500]).to(device) 
    atk.set_mode_targeted_by_label()

    # 4. Generate protected image (The "Adversarial Shield")
    protected_tensor = atk(img_tensor, target_labels)
    
    # 5. Convert back to PIL
    protected_img = T.ToPILImage()(protected_tensor.squeeze(0).cpu())
    
    # 6. Resize back to original size
    protected_img = protected_img.resize(original_size, Image.LANCZOS)
    
    # 7. Save as PNG (Lossless) - JPEG will destroy the protection!
    img_byte_arr = io.BytesIO()
    protected_img.save(img_byte_arr, format="PNG", optimize=True)
    return img_byte_arr.getvalue()

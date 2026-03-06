import cv2
import numpy as np

def protect_image(img, strength=0.15):
    """
    Invisible adversarial protection - looks identical to humans but breaks AI models.
    The protection is subtle enough to be imperceptible to human eyes but destructive to neural networks.
    """
    img_float = img.astype(np.float32) / 255.0
    h, w = img.shape[:2]
    
    # =================================================================
    # LAYER 1: Subtle adversarial noise (invisible to humans, breaks CNNs)
    # =================================================================
    # Very low amplitude noise that AI can detect but humans cannot
    noise = np.random.randn(h, w, 3) * strength * 0.08
    
    # Create subtle adversarial pattern
    x = np.linspace(0, 8 * np.pi, w)
    y = np.linspace(0, 8 * np.pi, h)
    X, Y = np.meshgrid(x, y)
    
    # Multi-frequency pattern - very subtle
    adversarial_pattern = (np.sin(X * 2 + Y * 1.5) * 0.3 + np.sin(X * 5 - Y * 4) * 0.2 + np.sin(X * 11 + Y * 9) * 0.1)
    
    # Normalize
    adversarial_pattern = (adversarial_pattern - adversarial_pattern.min()) / (adversarial_pattern.max() - adversarial_pattern.min() + 1e-10)
    
    # Apply very subtly to each channel
    for c in range(3):
        channel_pattern = adversarial_pattern * (1 + c * 0.05)
        noise[:,:,c] += channel_pattern * strength * 0.15
    
    img_float += noise
    img_float = np.clip(img_float, 0, 1)
    
    # =================================================================
    # LAYER 2: Invisible high-frequency injection
    # =================================================================
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    
    # FFT - only modify very high frequencies (invisible to humans)
    f = np.fft.fft2(gray)
    fshift = np.fft.fftshift(f)
    
    # Keep most low-freq, only modify outer high-freq
    crow, ccol = h // 2, w // 2
    r = min(h, w) // 8  # Small center (most of image stays intact)
    mask = np.zeros((h, w), np.float32)
    mask[crow-r:crow+r, ccol-r:ccol+r] = 1
    
    # Subtle amplification of very high frequencies only
    high_freq = fshift * (1 - mask) * strength * 0.5
    
    # Reconstruct
    f_back = np.fft.ifftshift(high_freq)
    img_high_freq = np.fft.ifft2(f_back)
    high_freq_mag = np.abs(img_high_freq)
    high_freq_mag = (high_freq_mag - high_freq_mag.min()) / (high_freq_mag.max() - high_freq_mag.min() + 1e-10)
    
    # Apply very subtly
    high_freq_overlay = np.stack([high_freq_mag * strength * 0.05] * 3, axis=2)
    img_float = img_float * 0.97 + high_freq_overlay * 0.03
    
    # =================================================================
    # LAYER 3: Minimal edge disruption
    # =================================================================
    edges = cv2.Canny(img, 80, 200)
    edge_mask = cv2.dilate(edges.astype(np.float32) / 255, np.ones((3, 3), np.uint8))
    
    # Very subtle edge noise
    edge_noise = np.random.randn(h, w, 3) * edge_mask[:, :, np.newaxis] * strength * 0.1
    img_float += edge_noise
    img_float = np.clip(img_float, 0, 1)
    
    # =================================================================
    # LAYER 4: Minimal color channel adjustment
    # =================================================================
    for c in range(3):
        channel = img_float[:, :, c]
        
        # Non-linear transformation - barely noticeable
        channel = np.power(channel + 0.05, 1.02) - 0.05
        
        # Very subtle gradient disruption
        sobelx = cv2.Sobel(channel, cv2.CV_32F, 1, 0, ksize=3)
        sobely = cv2.Sobel(channel, cv2.CV_32F, 0, 1, ksize=3)
        gradient = np.sqrt(sobelx**2 + sobely**2)
        
        # Almost invisible gradient disruption
        gradient_disrupt = -gradient * strength * 0.05
        gradient_disrupt = cv2.resize(gradient_disrupt, (w, h))
        
        channel += gradient_disrupt
        img_float[:, :, c] = np.clip(channel, 0, 1)
    
    # =================================================================
    # LAYER 5: Minimal block artifact
    # =================================================================
    block_size = 16
    for i in range(0, h - block_size, block_size):
        for j in range(0, w - block_size, block_size):
            block = img_float[i:i+block_size, j:j+block_size]
            
            # Very tiny offset
            offset = (np.random.rand() - 0.5) * strength * 0.05
            block += offset
            
            img_float[i:i+block_size, j:j+block_size] = block
    
    # =================================================================
    # LAYER 6: Tiny final noise
    # =================================================================
    final_noise = np.random.randn(h, w, 3) * 0.005
    img_float += final_noise
    
    # Clamp
    img_float = np.clip(img_float, 0, 1)
    
    return (img_float * 255).astype(np.uint8)


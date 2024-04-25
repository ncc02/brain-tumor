from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from PIL import Image
import os

import cv2
import numpy as np
from tensorflow import keras

# Load the pre-trained model
model = keras.models.load_model('./brainTumor.h5')

def predict(image_path):
    # Load the image
    img = cv2.imread(image_path)
    
    # Preprocess the image
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (128, 128))
    img = img / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    
    # Make the prediction
    prediction = model.predict(img)
    
    # Interpret the prediction
    if prediction > 0.5:
        result = "Tumor"
    else:
        result = "No Tumor"
    
    return result

# # Example usage
# image_path = "path/to/brain_mri_image.jpg"
# prediction = predict_brain_tumor(image_path)
# print(f"Prediction: {prediction}")

# @csrf_exempt
# def upload_images(request):
#     if request.method == 'POST':
#         image = request.FILES['image']
#         filename = image.name
#         filepath = os.path.join(os.path.dirname(__file__), filename)

#         with open(filepath, 'wb+') as f:
#             for chunk in image.chunks():
#                 f.write(chunk)
#         return JsonResponse({'res':str(predict(filepath))})
#     else:
#         return JsonResponse({'res':"Error Method."})

@csrf_exempt
def upload_images(request):
    if request.method == 'POST':
        image = request.FILES['image']
        # Đường dẫn thư mục muốn lưu ảnh
        upload_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
        
        # Tạo thư mục nếu chưa tồn tại
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        # Đường dẫn file ảnh sẽ lưu
        filename = image.name
        filepath = os.path.join(upload_dir, filename)
        
        with open(filepath, 'wb+') as f:
            for chunk in image.chunks():
                f.write(chunk)
        
        return JsonResponse({'res': str(predict(filepath))})
    else:
        return JsonResponse({'res': "Error Method."})
import cv2
import numpy as np
import base64

# 讀取檔案並轉換成 base64
def file_to_base64(file_path):
    with open(file_path, "rb") as file:
        file_data = file.read()
        base64_encoded_data = base64.b64encode(file_data)
        base64_message = base64_encoded_data.decode('utf-8')
    return base64_message

# Base64 字串轉換成 OpenCV 圖像
def base64_to_image(base64_string):
    img_data = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

# OpenCV 圖像轉換成 Base64
def image_to_base64(image):
    _, buffer = cv2.imencode('.png', image)
    base64_string = base64.b64encode(buffer).decode('utf-8')
    return base64_string

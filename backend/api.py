from flask import Flask, request, jsonify, send_file, render_template
import cv2
import numpy as np
from sift_puzzle_solver import match_piece_to_image
import base64

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/api/match_piece', methods=['POST'])
def match_piece():
    if 'complete_image' not in request.json or 'piece_image' not in request.json:
        return jsonify({'error': '请提供完整图片和拼图块图片'}), 400
    
    complete_image_data = request.json['complete_image']
    piece_image_data = request.json['piece_image']
    
    # 解码base64字符串为图像
    complete_image = cv2.imdecode(np.frombuffer(base64.b64decode(complete_image_data), np.uint8), cv2.IMREAD_COLOR)
    piece_image = cv2.imdecode(np.frombuffer(base64.b64decode(piece_image_data), np.uint8), cv2.IMREAD_COLOR)
    
    # 调用match_piece_to_image函数
    matched_piece_image, final_complete_image = match_piece_to_image(complete_image, piece_image)
    
    # 将结果图像编码为base64字符串
    _, matched_piece_image_buffer = cv2.imencode('.jpg', matched_piece_image)
    _, final_complete_image_buffer = cv2.imencode('.jpg', final_complete_image)
    
    matched_piece_image_base64 = base64.b64encode(matched_piece_image_buffer).decode('utf-8')
    final_complete_image_base64 = base64.b64encode(final_complete_image_buffer).decode('utf-8')
    
    # 返回base64字符串
    return jsonify({
        'matched_piece_image': matched_piece_image_base64,
        'final_complete_image': final_complete_image_base64
    })

@app.route('/api/match_piece/conan', methods=['POST'])
def match_piece_conan():
    if 'piece_image' not in request.json:
        return jsonify({'error': '请提供完整图片和拼图块图片'}), 400
    
    # 读取"conan_complete.png"并编码为base64字符串
    with open("conan_complete.png", "rb") as image_file:
        complete_image_data = base64.b64encode(image_file.read()).decode('utf-8')
    
    piece_image_data = request.json['piece_image']
    
    # 解码base64字符串为图像
    complete_image = cv2.imdecode(np.frombuffer(base64.b64decode(complete_image_data), np.uint8), cv2.IMREAD_COLOR)
    piece_image = cv2.imdecode(np.frombuffer(base64.b64decode(piece_image_data), np.uint8), cv2.IMREAD_COLOR)
    
    # 调用match_piece_to_image函数
    matched_piece_image, final_complete_image = match_piece_to_image(complete_image, piece_image)
    
    # 将结果图像编码为base64字符串
    _, matched_piece_image_buffer = cv2.imencode('.jpg', matched_piece_image)
    _, final_complete_image_buffer = cv2.imencode('.jpg', final_complete_image)
    
    matched_piece_image_base64 = base64.b64encode(matched_piece_image_buffer).decode('utf-8')
    final_complete_image_base64 = base64.b64encode(final_complete_image_buffer).decode('utf-8')
    
    # 返回base64字符串
    return jsonify({
        'matched_piece_image': matched_piece_image_base64,
        'final_complete_image': final_complete_image_base64
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
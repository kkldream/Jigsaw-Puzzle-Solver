import cv2
import numpy as np
import matplotlib.pyplot as plt

def match_piece_to_image(complete_image_path, piece_image_path):
    # 读取图像
    complete_image_color = cv2.imread(complete_image_path)
    complete_image_gray = cv2.cvtColor(complete_image_color, cv2.COLOR_BGR2GRAY)
    piece = cv2.imread(piece_image_path, 0)

    # 初始化SIFT检测器和暴力匹配器
    sift = cv2.SIFT_create()
    bf = cv2.BFMatcher()

    # 特征提取
    kp2, des2 = sift.detectAndCompute(complete_image_gray, None)
    kp1, des1 = sift.detectAndCompute(piece, None)

    # 特征匹配
    matches = bf.knnMatch(des1, des2, k=2)

    # 应用Lowe's比率测试
    good = [m for m, n in matches if m.distance < 0.7 * n.distance]

    complete_image_result = complete_image_color.copy()
    if len(good) > 10:
        # 计算单应性矩阵
        src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
        
        # 绘制匹配结果
        h, w = piece.shape
        pts = np.float32([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]).reshape(-1, 1, 2)
        dst = cv2.perspectiveTransform(pts, M)
        complete_image_result = cv2.polylines(complete_image_result, [np.int32(dst)], True, (0, 255, 0), 3, cv2.LINE_AA)

    # 绘制匹配结果
    img3 = cv2.drawMatches(piece, kp1, complete_image_gray, kp2, good, None, flags=2)

    return img3, complete_image_result

# 使用函数
complete_image_path = "picture.jpg"
piece_image_path = "puzzlepieces_2.jpg"

img3, complete_image_result = match_piece_to_image(complete_image_path, piece_image_path)

# 显示结果
plt.figure(figsize=(12, 6))
plt.subplot(121), plt.imshow(cv2.cvtColor(img3, cv2.COLOR_BGR2RGB)), plt.title('Matching Result'), plt.axis('off')
plt.subplot(122), plt.imshow(cv2.cvtColor(complete_image_result, cv2.COLOR_BGR2RGB)), plt.title('Full Color Result'), plt.axis('off')
plt.show()

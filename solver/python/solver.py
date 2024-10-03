import cv2
import numpy as np
from utils import base64_to_image, image_to_base64

def solver(complete_image_base64, piece_image_base64):
    complete_image = base64_to_image(complete_image_base64)
    piece_image = base64_to_image(piece_image_base64)
    
    # 读取图像
    complete_image_gray = cv2.cvtColor(complete_image, cv2.COLOR_BGR2GRAY)
    piece_image_gray = cv2.cvtColor(piece_image, cv2.COLOR_BGR2GRAY)  # 将拼图图像转换为灰度图像

    complete_image_height, complete_image_width = complete_image_gray.shape[:2]
    piece_image_height, piece_image_width = piece_image_gray.shape[:2]
    draw_line_thickness = max(1, int(min(complete_image_height, complete_image_width) * 0.005))  # 使用短邊的0.5%，最小為1像素

    # 初始化SIFT检测器和暴力匹配器
    sift = cv2.SIFT_create(nfeatures=0, nOctaveLayers=3, contrastThreshold=0.04, edgeThreshold=10, sigma=1.6)
    bf = cv2.BFMatcher()

    # 特征提取
    kp2, des2 = sift.detectAndCompute(complete_image_gray, None)
    kp1, des1 = sift.detectAndCompute(piece_image_gray, None)

    # 特征匹配
    matches = bf.knnMatch(des1, des2, k=2)

    # 应用Lowe's比率测试
    good = [m for m, n in matches if m.distance < 0.8 * n.distance]

    final_complete_image = complete_image.copy()

    for match in good:
        pt2 = tuple(map(int, kp2[match.trainIdx].pt))
        cv2.circle(final_complete_image, (pt2[0], pt2[1]), draw_line_thickness, (0, 255, 0), draw_line_thickness // 2)  # 在匹配点绘制圆圈

    if len(good) > 5:
        # 计算单应性矩阵
        src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)

        # 绘制匹配结果
        pts = np.float32([
            [0, 0], 
            [0, piece_image_height - 1],
            [piece_image_width - 1, piece_image_height - 1], 
            [piece_image_width - 1, 0]]
        ).reshape(-1, 1, 2)
        dst = cv2.perspectiveTransform(pts, M)
        # final_complete_image = cv2.polylines(final_complete_image, [np.int32(dst)], True, (255, 0, 0), draw_line_thickness, cv2.LINE_AA)

        top_left = (int(dst[0][0][0]), int(dst[0][0][1]))
        bottom_right = (int(dst[2][0][0]), int(dst[2][0][1]))
        cv2.rectangle(final_complete_image, top_left, bottom_right, (0, 0, 255), draw_line_thickness)

    # 绘制匹配结果
    matched_piece_image = cv2.drawMatches(piece_image_gray, kp1, complete_image_gray, kp2, good, None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)  # 添加 matchColor 参数

    return [
        {
            "name": "matched_piece_image",
            "base64": image_to_base64(matched_piece_image)
        },
        {
            "name": "final_complete_image",
            "base64": image_to_base64(final_complete_image)
        }
    ]

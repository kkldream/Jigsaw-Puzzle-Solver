import cv2
import numpy as np
import matplotlib.pyplot as plt

def match_piece_to_image(complete_image, piece_image):
    # Optional: color histogram equalization or contrast adjustment
    complete_image_eq = cv2.convertScaleAbs(complete_image, alpha=1.2, beta=10)
    piece_image_eq = cv2.convertScaleAbs(piece_image, alpha=1.2, beta=10)

    complete_image_height, complete_image_width = complete_image.shape[:2]
    piece_image_height, piece_image_width = piece_image.shape[:2]
    draw_line_thickness = max(1, int(min(complete_image_height, complete_image_width) * 0.005))  # 使用短邊的0.5%，最小為1像素

    # Create SIFT with more features and different thresholds
    sift = cv2.SIFT_create(nfeatures=100000, nOctaveLayers=40, contrastThreshold=0.01, edgeThreshold=5, sigma=1.6)
    bf = cv2.BFMatcher()

    # Feature extraction on color images (removing grayscale step)
    kp2, des2 = sift.detectAndCompute(complete_image_eq, None)
    kp1, des1 = sift.detectAndCompute(piece_image_eq, None)

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
    matched_piece_image = cv2.drawMatches(piece_image_eq, kp1, complete_image_eq, kp2, good, None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)  # 添加 matchColor 参数

    return matched_piece_image, final_complete_image  # 添加完整图像作为返回值

if __name__ == '__main__':
    # 使用函数
    # complete_image_path = "picture.jpg"
    # piece_image_path = "puzzlepieces_2.jpg"
    # complete_image_path = "conan-6.jpg"
    complete_image_path = "conan_complete.png"
    piece_image_path = "conan-puzzle-1.jpg"

    complete_image = cv2.imread(complete_image_path)  # 读取完整图像
    piece_image = cv2.imread(piece_image_path)  # 读取拼图图像

    matched_piece_image, final_complete_image = match_piece_to_image(complete_image, piece_image)

    # 显示结果
    plt.figure(figsize=(12, 6))  # 调整图形大小以适应三个子图
    plt.subplot(121), plt.imshow(cv2.cvtColor(matched_piece_image, cv2.COLOR_BGR2RGB)), plt.title('Matching Result'), plt.axis('off')
    plt.subplot(122), plt.imshow(cv2.cvtColor(final_complete_image, cv2.COLOR_BGR2RGB)), plt.title('Full Color Result'), plt.axis('off')
    plt.show()

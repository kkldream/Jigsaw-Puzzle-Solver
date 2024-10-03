import cv2
import matplotlib.pyplot as plt
from solver import solver
from utils import file_to_base64, base64_to_image

if __name__ == '__main__':
    complete_image_path = "puzzle_complete.jpg"
    piece_image_path = "puzzle_pieces_1.jpg"

    complete_image_base64 = file_to_base64(complete_image_path)
    piece_image_base64 = file_to_base64(piece_image_path)

    result = solver(complete_image_base64, piece_image_base64)

    matched_piece_image = base64_to_image(result[0]["base64"])
    final_complete_image = base64_to_image(result[1]["base64"])
     
    plt.figure(figsize=(12, 6))
    plt.subplot(121), plt.imshow(cv2.cvtColor(matched_piece_image, cv2.COLOR_BGR2RGB)), plt.title('Matching Result'), plt.axis('off')
    plt.subplot(122), plt.imshow(cv2.cvtColor(final_complete_image, cv2.COLOR_BGR2RGB)), plt.title('Full Color Result'), plt.axis('off')
    plt.show()

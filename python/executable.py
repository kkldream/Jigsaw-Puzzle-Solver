from solver import solver
import sys
import json

if __name__ == '__main__':
    input_data = json.loads(sys.stdin.read())
    complete_image_base64 = input_data['complete_image_base64']
    piece_image_base64 = input_data['piece_image_base64']

    result = solver(complete_image_base64, piece_image_base64)

    print(json.dumps(result))

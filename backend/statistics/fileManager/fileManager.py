import os
from backend.statistics import app
from flask import jsonify, request


UPLOAD_FOLDER = 'uploads'  # Define your upload directory

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# @app.route('/check-file/<filename>', methods=['GET'])
def check_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    exists = os.path.exists(file_path)
    return jsonify({'exists': exists})

# @app.route('/upload-file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    try:
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
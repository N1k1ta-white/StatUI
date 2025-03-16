import os
from flask import jsonify, request
from dotenv import load_dotenv

load_dotenv()

UPLOAD_FOLDER = 'uploads'  # Define your upload directory

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def check_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    exists = os.path.exists(file_path)
    return jsonify({'exists': exists})

def upload_file(file):    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    try:
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
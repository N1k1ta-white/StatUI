import os
from flask import jsonify, request
from dotenv import load_dotenv

load_dotenv()

# Define upload directory as a relative path to ../uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads')

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
    
def get_file(filename):
    if not filename:
        print("Error: No filename provided")
        return None
        
    # Sanitize filename to prevent path traversal attacks
    filename = os.path.basename(filename)
    file_path = os.path.normpath(os.path.join(UPLOAD_FOLDER, filename))
    
    # Verify the file is within the allowed directory
    if not os.path.abspath(file_path).startswith(os.path.abspath(UPLOAD_FOLDER)):
        print(f"Security error: Path traversal attempt detected for {filename}")
        return None
    
    try:
        # Check file state
        if os.path.isfile(file_path) and os.access(file_path, os.R_OK):
            print(f"File found and readable: {file_path}")
            return file_path
        
        # Detailed diagnostics
        if not os.path.exists(file_path):
            print(f"File does not exist: {file_path}")
        elif not os.path.isfile(file_path):
            print(f"Path exists but is not a file: {file_path}")
        elif not os.access(file_path, os.R_OK):
            print(f"File exists but is not readable: {file_path}")
            
        # Directory contents for debugging
        dir_path = os.path.dirname(file_path)
        if os.path.exists(dir_path) and os.access(dir_path, os.R_OK):
            print(f"Directory contents: {os.listdir(dir_path)}")
        
        return None
    except Exception as e:
        print(f"OS error accessing file: {str(e)}")
        return None
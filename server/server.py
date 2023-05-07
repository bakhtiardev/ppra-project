from flask import Flask, request
from flask_cors import CORS, cross_origin
from logicchecks import *
from nlplogic import *
from werkzeug.utils import secure_filename
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '.\docs'
CORS(app)


@cross_origin()
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    # response.headers.add('Access-Control-Allow-Origin', '*')
    if 'file' not in request.files:
        return {'message': 'No file uploaded'}, 400

    file = request.files['file']

    if file.filename == '':
        return {'message': 'No file selected'}, 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        res = genText(file)
        return res, 200
    else:
        return {'message': 'Invalid file type'}, 400


@app.route('/')
def home():
    return {'message': 'Hellow world'}, 200


if __name__ == '__main__':
    app.run(debug=True)

import tabula
from flask import Flask, request
from flask_cors import CORS, cross_origin
from logicchecks import *
from nlplogic import *
from brandName import getBrandName
from webLink import *
from bidopenclose import getBidTimes
from contractAmount import getContractAmount
from twopercent import getTwoPercent
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '.\docs'
CORS(app)

data = {}


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

        return getAll(file), 200
    else:
        return {'message': 'Invalid file type'}, 400


def getAll(file):
    contractAmount = getContractAmount(file)
    brandName = getBrandName(file)
    websiteLinks = getWebsiteLinks(file)
    bidTime = getBidTimes(file)
    twoPercentWords = getTwoPercent(file)
    if (contractAmount):
        data['contract_amount'] = contractAmount[0]
    else:
        data['contract_amount'] = None

    if (brandName):
        data['brand_name'] = brandName
    else:
        data['brand_name'] = None

    if (websiteLinks):
        data['web_links'] = websiteLinks
    else:
        data['web_links'] = None

    if (bidTime):
        data['bid_times'] = bidTime
    else:
        data['bid_times'] = None

    if (twoPercentWords):
        data['two_percent'] = twoPercentWords
    else:
        data['two_percent'] = None

    return data


@app.route('/')
def home():
    return {'message': 'Hellow world'}, 200


if __name__ == '__main__':
    app.run(debug=True)

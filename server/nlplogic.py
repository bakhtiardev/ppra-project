import spacy
from flask import Flask, request
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import PyPDF2

nlp = spacy.load("en_core_web_sm")
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))


def preprocess(text):
    # Tokenize the text data into words
    words = nlp(text)

    # Remove stop words from the text data
    tokens = nlp(text)
    tokens = [token.text.lower(
    ) for token in tokens if not token.is_stop and token.text.lower() not in stop_words]

    # Perform lemmatization on the text data
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # Join the cleaned words back into a single string
    clean_text = ' '.join(tokens)

    return clean_text


def genText(file):
    # file = request.files['file']
    # Read the PDF file using PyPDF2
    pdf_reader = PyPDF2.PdfReader(file)
    text = ''
    for page in pdf_reader.pages:
        text += page.extract_text()

    clean_text = preprocess(text)

    # Tokenize the text data
    tokens = nlp(clean_text)

    # Return the text content of the PDF file as a response
    return tokens

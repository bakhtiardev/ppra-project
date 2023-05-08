import spacy
from flask import Flask, request
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import PyPDF2
import numerizer
from spacy.matcher import Matcher
import re
import tabula
from numerizer import numerize

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

    # with open('sample.pdf','rb') as pdf_file:
    pdf_reader = PyPDF2.PdfReader(file)
    text = ''
    for page in pdf_reader.pages:
        text += page.extract_text()

    clean_text = preprocess(text)

    return clean_text


def getTokenText(file):
    doc = nlp(genText(file))
    return doc

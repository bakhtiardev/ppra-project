from nlplogic import getTokenText
import csv
import spacy
from spacy.matcher import Matcher

nlp = spacy.load("en_core_web_sm")


def checkBrandName(file):
    doc = getTokenText(file)
    brandNameCsv = open("brand-names.csv", "r")
    r = csv.reader(brandNameCsv, delimiter=",")
    string_list = []
    for line in r:
        string_list.extend(map(str, line))
    string_list = list(filter(lambda x: x != '', string_list))

    for string in string_list:
        for token in doc:
            if string.lower() == token.text.lower():
                return string
    return None
# print('brand-name',checkBrandName(pdf_file))


def orEquivalentCase(file):
    nlp_doc = getTokenText(file)

    matcher = Matcher(nlp.vocab)
    pattern = [
        {"LOWER": "or", "OP": "+"},

        {"LOWER": "equivalent", "OP": "+"},

        {"IS_ALPHA": True, "OP": "*"},

    ]
    matcher.add('OR_Equivalent', [pattern], greedy="LONGEST")
    matches = matcher(nlp_doc)
    print(len(matches))
    extracted_str = ""
    if (len(matches) > 0):
        return nlp_doc[matches[0][1]:matches[0][2]].text
    else:
        return None


def getBrandName(file):

    if (checkBrandName(file)):
        return checkBrandName(file)
    if (orEquivalentCase(file)):
        return str(orEquivalentCase(file))

    return None

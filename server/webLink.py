import spacy
import re
from nlplogic import *

nlp = spacy.load("en_core_web_sm")


def checkWebsiteLink(file):
    doc = getTokenText(file)

    url_pattern = re.compile(r"(https?://|www\.)\S+")
    # Find website links using regular expressions
    website_links = []
    for match in re.finditer(url_pattern, doc.text):
        start, end = match.span()
        website_links.append(match.group())

    if (len(website_links) > 0):
        return website_links
    return []


def getWebsiteLinks(file):
    websites = checkWebsiteLink(file)
    websites = list(set(websites))
    if (len(websites) > 0):
        if (len(websites) == 1):
            return websites
        else:
            return websites
    return None

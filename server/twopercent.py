import spacy
from spacy.matcher import Matcher
import re
from nlplogic import getTokenText

# Load the pre-trained SpaCy model
nlp = spacy.load("en_core_web_sm")


def getTwoPercent(file):
    nlp_doc = getTokenText(file)

    matcher = Matcher(nlp.vocab)
    # Define the pattern to match "hour" or "hours" with a four-digit number before it
    pattern1 = [
        # {"LIKE_NUM": True, "LENGTH": 1, "OP": "+"},
        {"ORTH": "2"},
        {"ORTH": "%", "OP": "+", },
    ]
    pattern2 = [
        # {"LIKE_NUM": True, "LENGTH": 1, "OP": "+"},
        {"LOWER": "two"},
        {"LOWER": "percent", "OP": "?"},
    ]
    matcher.add('TWO_PERCENT', [pattern1, pattern2], greedy="LONGEST")
    matches = matcher(nlp_doc)
    # Print the matched spans

    bids = []
    for match_id, start, end in matches:
        bids.append(nlp_doc[start:end].text)

    if (len(bids) > 0):
        return bids
    else:
        return None

import spacy
from spacy.matcher import Matcher
import re
from nlplogic import getTokenText

# Load the pre-trained SpaCy model
nlp = spacy.load("en_core_web_sm")


def getBidTimes(file):
    nlp_doc = getTokenText(file)

    matcher = Matcher(nlp.vocab)
    # Define the pattern to match "hour" or "hours" with a four-digit number before it
    pattern = [{"LIKE_NUM": True, "LENGTH": 4, "OP": "+"},
               {"LOWER": {"IN": ["hour", "hours"]}}]

    matcher.add('BID_OPEN_CLOSE', [pattern], greedy="LONGEST")
    matches = matcher(nlp_doc)
    # Print the matched spans

    bids = []
    for match_id, start, end in matches:
        bids.append(nlp_doc[start:end].text)

    patternDigit = [{'IS_DIGIT': True, 'LENGTH': 4}]
    matcher.add("BID_SECURITY_NUM", [patternDigit], greedy="LONGEST")

    timeBids = []
    for bid in bids:
        timeBids.append(int(bid[:4]))

    if (len(bids) > 0):
        return [max(timeBids), min(timeBids)]
    else:
        return None

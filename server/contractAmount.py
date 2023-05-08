import tabula
import spacy
import numerizer
from nlplogic import *
import re
from numerizer import numerize
from spacy.matcher import Matcher

# Load the pre-trained SpaCy model
nlp = spacy.load("en_core_web_sm")


def extract_contract_amount(file):
    # genText
    nlp_doc = genText(file)

    nlp_doc = nlp(nlp_doc)
    matcher = Matcher(nlp.vocab)
    pattern = [
        {"LOWER": "contract", "OP": "+"},

        {"LOWER": "amount", "OP": "+"},


        # {"LOWER":"is","OP":"?"},
        # {"LOWER":"the","OP":"?"},
        # {"TEXT": {"REGEX": "^(Response|response|RESPONSE)*$"},"OP":"+"},
        {"IS_ALPHA": True, "OP": "*"},
        {"TEXT": {"REGEX": "^[@=: ]*$"}, "OP": "*"},
        {"LIKE_NUM": True, "OP": "*"},
        {"POS": "NOUN", "OP": "?"}
        # {"TEXT": {"REGEX": "^(Days|days|DAYS)*$"},"OP":"+"}
        # {"IS_SPACE":True,"OP":"?"},
        # {"LIKE_NUM":True,"OP":"?"},
        # {"POS":"NOUN","OP":"+"}
        # {"TEXT": {"REGEX": "^(lack|lac)*$"},"OP":"?"},
        # {"TEXT": {"REGEX": "^[@=: ]*$"},"OP":"*"},

    ]
    matcher.add('CONTRACT_AMOUNT', [pattern], greedy="LONGEST")
    matches = matcher(nlp_doc)
    print(len(matches))
    extracted_str = ""
    if (len(matches) > 0):
        extracted_str = nlp_doc[matches[0][1]:matches[0][2]].text
    else:
        return None

    print("Contract amount STR:------------ "+extracted_str)

    patternOfNum = [{"LIKE_NUM": True, "OP": "+"},
                    {"TEXT": {"REGEX": "^(lack|lac)*$"}, "OP": "?"}]
    matcher.add("CONT_AM_NUM", [patternOfNum], greedy="LONGEST")

    extracted_str = nlp(extracted_str)
    matchesNum = matcher(extracted_str)
    print(len(matchesNum))
    extractedNum = extracted_str[matchesNum[-1][1]:matchesNum[-1][2]]
    extractedNum = extractedNum._.numerize()

    # Removing comma and converting into Integer
    result = int(float(extractedNum.replace(',', '')))
    print(f"Extracted Number:--------------- {result}")
    if (result > 100000):
        return result
    else:
        return None


def findContractAmountFromTable(file):
    table = tabula.read_pdf(file, multiple_tables=True)
    # Define two example sentences
    sent1 = "NIT cost"
    sent2 = "Estimated Cost"

    # Process the sentences using SpaCy
    doc1 = nlp(sent1)
    doc2 = nlp(sent2)
    doc3 = nlp('Contract amount')

    for tab in table:
        for col in tab.columns:
            coldoc = nlp(col)
            if (coldoc.similarity(doc1) > 0.7 or coldoc.similarity(doc2) > 0.7 or coldoc.similarity(doc3) > 0.7):
                s = tab[col]
                res = s.loc[s.first_valid_index()]
                # Remove non-numeric character from responce
                result = re.sub(r'[^0-9]', '', res)
                num = numerize(result)
                return num, col

    return None


def getContractAmount(file):
    contractAmount_fromText = extract_contract_amount(file)
    contractAmount_fromTable = findContractAmountFromTable(file)
    if (contractAmount_fromTable is None):
        if (contractAmount_fromText is None):
            return None
        else:
            return contractAmount_fromText
    else:
        return contractAmount_fromTable

from rule_engine import Rule


rule = Rule(
    'data.length > 100'
)


def evaluate_rules(pdf_text):
    return rule.matches({"data": pdf_text})

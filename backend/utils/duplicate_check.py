def check_duplicate_drug(new_drug, existing_drugs):
    if new_drug.lower() in [drug.lower() for drug in existing_drugs]:
        return True
    return False

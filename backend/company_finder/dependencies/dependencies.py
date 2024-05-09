import pandas as pd
import json
import re


def read_from_csv():

    df = pd.read_csv("./data/companies_data.csv")
    columns_map = {}
    for old_column in df.columns:
        if old_column == "Unnamed 0:":
            columns_map.update(
                {f"{old_column}": re.sub("Unnamed 0:", "row", old_column).lower()}
            )
        else:
            columns_map.update(
                {f"{old_column}": re.sub(r"\s|:", "_", old_column).lower()}
            )
    df.rename(columns=columns_map, inplace=True)
    df_json = json.loads(df.to_json(orient="records"))

    return df_json


# It was used for test purposes. :)
def fetch_companies(query):
    df_json = read_from_csv()
    companies_list = [
        company
        for company in df_json
        if re.search(query, company["company_name"], re.IGNORECASE)
    ]

    return companies_list

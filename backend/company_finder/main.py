from typing import Union, List

from .models.company import Company

from .schemas.schemas import CompanyBase
from .databases.database import Base, SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from sqlalchemy import and_

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/company")
def read_company(company_name: Union[str, None] = None):
    if company_name == None or company_name == "":
        return []
    session = SessionLocal()
    result = (
        session.query(Company)
        .filter(Company.company_name.ilike(f"%{company_name}%"))
        .all()
    )
    return result


@app.get("/company/similar", response_model=List[CompanyBase])
def read_company_similar(
    row: Union[str, None] = None,
    industry: Union[str, None] = None,
    country: Union[str, None] = None,
    keywords: Union[str, None] = None,
):
    keywords_list = keywords.split(",")
    session = SessionLocal()

    query_ind_country = session.query(Company).filter(
        and_(
            Company.industry.like(industry),
            Company.country.like(country),
            Company.row != row,
        )
    )
    # Fetching results by keywords and put alongside of industry and country
    query = session.query(Company).filter(False)
    for keyword in keywords_list:
        query_keyword = session.query(Company).filter(
            and_(Company.company_name.ilike(f"%{keyword}%"), Company.row != row)
        )
        if query_keyword.first() is not None:
            query = query_ind_country.union(query_keyword)

    return query if query.first() is not None else query_ind_country

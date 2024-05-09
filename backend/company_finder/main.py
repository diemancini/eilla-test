from typing import Union, List
import logging
import re
import time

from .models.company import Company
from .schemas.schemas import CompanyBase
from .databases.database import Base, SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

Base.metadata.create_all(bind=engine)

logger = logging.getLogger("uvicorn.error")
logger.setLevel(logging.DEBUG)

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


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/company", response_model=List[CompanyBase])
def read_company(company_name: Union[str, None] = None, db: Session = Depends(get_db)):
    logger.debug(company_name)
    if company_name == None:
        return []
    session = SessionLocal()
    # query_regexp = re.escape(q)
    result = (
        session.query(Company)
        # .filter(Company.company_name.regexp_match(query_regexp))
        .filter(Company.company_name.ilike(f"%{company_name}%")).all()
    )
    if result:
        logger.debug(result)
    # for row in result:
    #     logger.debug(f"row: {row.row}, company_name: {row.company_name}")
    time.sleep(2)
    return result


@app.get("/company/similar", response_model=List[CompanyBase])
def read_company_similar(
    industry: Union[str, None] = None,
    country: Union[str, None] = None,
    keywords: Union[str, None] = None,
    db: Session = Depends(get_db),
):
    logger.debug(industry)
    logger.debug(country)
    logger.debug(keywords.split(","))
    keywords_list = keywords.split(",")

    session = SessionLocal()
    result = session.query(Company).filter(
        and_(Company.industry.like(industry), Company.country.like(country))
        # .filter(Company.company_name.ilike(f"%{q}%")).all()
    )
    results_keywords = session.query(Company).filter(
        Company.keywords.in_(keywords_list)
    )
    result.join(results_keywords)
    logger.debug(result)
    for row in result:
        logger.debug(f"row: {row.row}, company_name: {row.company_name}")
    time.sleep(2)
    return result
    # return []

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
def read_company(q: Union[str, None] = None, db: Session = Depends(get_db)):
    logger.debug(q)
    session = SessionLocal()
    query_regexp = re.escape(q)
    result = (
        session.query(Company)
        # .filter(Company.company_name.regexp_match(query_regexp))
        .filter(Company.company_name.ilike(f"%{q}%")).all()
    )
    logger.debug(result)
    for row in result:
        logger.debug(f"row: {row.row}, company_name: {row.company_name}")
    time.sleep(2)
    return result

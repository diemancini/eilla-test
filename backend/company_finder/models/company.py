from sqlalchemy import Column, Integer, String

from databases.database import Base


class Company(Base):
    __tablename__ = "companies"

    row = Column(Integer, primary_key=True)
    linkedin_url = Column(String, default=None)
    company_name = Column(String, index=True)
    industry = Column(String, default=None)
    website = Column(String, default=None)
    tagline = Column(String, default=None)
    about = Column(String, default=None)
    year_founded = Column(Integer)
    locality = Column(String, default=None)
    country = Column(String, default=None)
    current_employee_estimate = Column(String, default=None)
    keywords = Column(String, default=None)

    class Config:
        orm_mode = True

from typing import Union

from pydantic import BaseModel


class CompanyBase(BaseModel):
    row: int
    company_name: str
    linkedin_url: Union[str, None] = None
    industry: Union[str, None] = None
    website: Union[str, None] = None
    tagline: Union[str, None] = None
    about: Union[str, None] = None
    year_founded: Union[int, None] = None
    locality: Union[str, None] = None
    country: Union[str, None] = None
    current_employee_estimate: Union[str, None] = None
    keywords: Union[str, None] = None

"""Add data into Company table

Revision ID: e40ad1027762
Revises: e4e889cd7cef
Create Date: 2024-05-06 21:39:06.093719

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import String, Integer
from sqlalchemy.sql import table, column

from dependencies.dependencies import read_from_csv


# revision identifiers, used by Alembic.
revision: str = "e40ad1027762"
down_revision: Union[str, None] = "e4e889cd7cef"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    companies_table = table(
        "companies",
        column("row", Integer),
        column("linkedin_url", String),
        column("company_name", String),
        column("industry", String),
        column("website", String),
        column("tagline", String),
        column("about", String),
        column("year_founded", Integer),
        column("locality", String),
        column("country", String),
        column("current_employee_estimate", String),
        column("keywords", String),
    )

    companies_list = read_from_csv()

    op.bulk_insert(companies_table, companies_list)


def downgrade() -> None:
    companies_table = table(
        "companies",
        column("row", Integer),
        column("linkedin_url", String),
        column("company_name", String),
        column("industry", String),
        column("website", String),
        column("tagline", String),
        column("about", String),
        column("year_founded", Integer),
        column("locality", String),
        column("country", String),
        column("current_employee_estimate", String),
        column("keywords", String),
    )

    companies_table.delete()

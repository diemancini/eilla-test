#!/bin/sh
ls -la
alembic upgrade head
ls -la

fastapi dev main.py
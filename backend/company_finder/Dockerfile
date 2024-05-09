FROM python:3.11-slim-buster

RUN python3 -m venv backend_env
RUN ls / -la
SHELL ["/bin/bash", "-c"]
RUN source backend_env/bin/activate

WORKDIR /app
# Copy in your requirements file
ADD requirements.txt /app/requirements.txt

RUN set -ex \
  && pip3 install --upgrade pip \
  && pip3 install --no-cache-dir -r /app/requirements.txt

COPY . .

# RUN chmod +x entrypoint.sh

# ENTRYPOINT ["/app/entrypoint.sh"]
#CMD ["alembic", "upgrade", "head"]
RUN alembic upgrade head

CMD ["fastapi", "run", "main.py", "--port", "8000"]
FROM python:3.9
COPY app.py /app.py
CMD ["python", "app.py"]

FROM alpine:latest
CMD echo "✅ Docker container is running successfully!"


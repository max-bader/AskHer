from fastapi import FastAPI
from supabase_client import client  # this uses httpx + service role key
from typing import List

app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Backend is running"}

@app.get("/questions")
def get_questions():
    res = client.get("/questions?select=*")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()

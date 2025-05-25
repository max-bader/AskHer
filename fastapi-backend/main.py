from fastapi import FastAPI
from supabase_client import client  # this uses httpx + service role key
from typing import List
from routes.questions import router as questions_router
from routes.responses import router as responses_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(questions_router, tags=["Questions"])

app.include_router(responses_router, tags=["Responses"])


        


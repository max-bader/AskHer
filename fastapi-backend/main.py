from fastapi import FastAPI
from supabase_client import client  # this uses httpx + service role key
from typing import List
from routes.questions import router as questions_router
from routes.responses import router as responses_router


app = FastAPI()

app.include_router(questions_router, tags=["Questions"])

app.include_router(responses_router, tags=["Responses"])


        


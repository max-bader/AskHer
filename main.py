from fastapi import FastAPI
from routes.questions import router as questions_router
from routes.responses import router as responses_router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is running"}

app = FastAPI()

app.include_router(questions_router, tags=["Questions"])

app.include_router(responses_router, tags=["Responses"])


        


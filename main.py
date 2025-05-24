from fastapi import FastAPI
from routes.questions import router as questions_router
from routes.responses import router as responses_router
from routes.ai import router as ai_router
from routes.chatbot import router as chatbot_router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is running"}

app = FastAPI()

app.include_router(questions_router, tags=["Questions"])

app.include_router(responses_router, tags=["Responses"])

app.include_router(ai_router, tags=["AI"])
app.include_router(chatbot_router, prefix="/chatbot", tags=["Chatbot"])


        


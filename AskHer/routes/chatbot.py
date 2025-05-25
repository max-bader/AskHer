from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.ai.gemini_service import chat_with_ai
import uuid

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

@router.post("/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    try:
        # Generate a new session ID if one wasn't provided
        session_id = message.session_id or str(uuid.uuid4())
        
        # Get response from AI
        response = await chat_with_ai(session_id, message.message)
        
        return ChatResponse(
            response=response,
            session_id=session_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process chat message: {str(e)}"
        ) 
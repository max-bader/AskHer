from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.ai.gemini_service import generate_supportive_response

router = APIRouter()

class AIRequest(BaseModel):
    question: str
    tone: Optional[str] = "supportive"

@router.post("/generate-response")
async def generate_response(request: AIRequest):
    try:
        response = await generate_supportive_response(
            question=request.question,
            tone=request.tone
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI response: {str(e)}"
        )


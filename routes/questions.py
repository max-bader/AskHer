from fastapi import APIRouter, Request, Path, Query, HTTPException
from supabase_client import client
from typing import List
from schemas.models import QuestionCreate


router = APIRouter()

@router.get("/questions")
def get_questions():
    res = client.get("/questions?select=*")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()

@router.get("/questions/{id}")
def get_question_by_id(id: str):
    res = client.get(f"/questions?id=eq.{id}&select=*")
    if res.status_code != 200:
        return {"error": res.text}
    data = res.json()
    if not data:
        return {"error": "Question not found"}
    return data[0]

@router.post("/questions")
def create_question(question: QuestionCreate):
    res = client.post("/questions", json=question.dict())

    print("Supabase status:", res.status_code)
    print("Supabase text:", res.text)

    if res.status_code != 201:
        raise HTTPException(status_code=500, detail=res.text)

    if res.text.strip():
        return res.json()
    else:
        return {
            "message": "Question created successfully.",
            "status_code": res.status_code
        }


@router.get("/my/questions")
def get_my_questions(user_id: str = Query(...)):
    res = client.get(f"/questions?user_id=eq.{user_id}&select=*")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()



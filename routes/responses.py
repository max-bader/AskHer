from fastapi import APIRouter, Request, Path, Query
from supabase_client import client

router = APIRouter()

from fastapi import APIRouter, Request, Path, Query
from schemas.models import ResponseCreate, CommentCreate, UpvoteCreate
from supabase_client import client

router = APIRouter()

# POST /responses - create a new response to a question
@router.post("/responses")
def create_response(response: ResponseCreate):
    res = client.post("/responses", json=response.dict())
    if res.status_code != 201:
        return {"error": res.text}
    return res.json()

@router.get("/questions/{question_id}/responses")
def get_responses_for_question(question_id: str = Path(...)):
    res = client.get(f"/responses?question_id=eq.{question_id}&select=*")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()

@router.get("/responses/{id}")
def get_response_by_id(id: str):
    res = client.get(f"/responses?id=eq.{id}&select=*")
    if res.status_code != 200:
        return {"error": res.text}
    data = res.json()
    if not data:
        return {"error": "Response not found"}
    return data[0]

# get trending responses top 10 recent
@router.get("/trending")
def get_trending_responses():
    res = client.get("/responses?select=*&order=created_at.desc&limit=10")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()

# upvoting a response // POST
@router.post("/responses/{id}/upvote")
def upvote_response(id: str, upvote: UpvoteCreate):
    upvote_data = upvote.dict()
    upvote_data["response_id"] = id
    res = client.post("/upvotes", json=upvote_data)
    if res.status_code != 201:
        return {"error": res.text}
    return res.json()

# retrieving upvote // GET
@router.get("/responses/{id}/upvotes")
def get_upvotes_for_response(id: str):
    res = client.get(f"/upvotes?response_id=eq.{id}&select=*")
    if res.status_code != 200:
        return {"error": res.text}
    return {"count": len(res.json())}

# comments // POST
@router.post("/responses/{id}/comments")
def create_comment(id: str, comment: CommentCreate):
    comment_data = comment.dict()
    comment_data["response_id"] = id
    res = client.post("/comments", json=comment_data)
    if res.status_code != 201:
        return {"error": res.text}
    return res.json()

# retrieving comment // GET
@router.get("/responses/{id}/comments")
def get_comments_for_response(id: str):
    res = client.get(f"/comments?response_id=eq.{id}&select=*&order=created_at.asc")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()

@router.get("/my/responses")
def get_my_responses(user_id: str = Query(...)):
    res = client.get(f"/responses?user_id=eq.{user_id}&select=*")
    if res.status_code != 200:
        return {"error": res.text}
    return res.json()


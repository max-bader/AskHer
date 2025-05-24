from pydantic import BaseModel
from typing import Literal, Optional


class QuestionCreate(BaseModel):
    user_id: str
    content: str
    tone: Literal["advice", "just_listen", "encouragement"]


class ResponseCreate(BaseModel):
    question_id: str
    user_id: str
    content: str
    is_emoji: bool = False

class CommentCreate(BaseModel):
    response_id: str
    user_id: str
    content: str

class UpvoteCreate(BaseModel):
    response_id: str
    user_id: str

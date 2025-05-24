import google.generativeai as genai
from typing import Optional, List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables. Please create a .env file with your API key.")

# Configure the Gemini API
genai.configure(api_key=api_key)

def get_gemini_model():
    try:
        return genai.GenerativeModel('gemini-2.0-flash')
    except Exception as e:
        raise Exception(f"Failed to initialize Gemini model. Please check your API key. Error: {str(e)}")

class ChatSession:
    def __init__(self):
        self.model = get_gemini_model()
        self.chat = self.model.start_chat(history=[])
        self.system_prompt = """You are AskHer, a supportive and empathetic AI companion designed to help women navigate life's challenges. 
        Your responses should be:
        - Warm and understanding
        - Non-judgmental
        - Focused on emotional support and practical advice
        - Respectful of boundaries
        - Encouraging of professional help when needed
        
        Remember to:
        - Validate feelings
        - Offer gentle guidance
        - Maintain a supportive tone
        - Be clear about your limitations as an AI
        - Encourage self-care and self-compassion"""

    async def send_message(self, message: str) -> str:
        try:
            response = await self.chat.send_message_async(message)
            return response.text
        except Exception as e:
            error_msg = str(e)
            if "API key" in error_msg or "credentials" in error_msg:
                return "I apologize, but there seems to be an issue with the AI service configuration. Please make sure the API key is properly set up."
            return f"I apologize, but I'm having trouble processing that right now. Could you try rephrasing your message? Error: {error_msg}"

# Create a dictionary to store chat sessions
chat_sessions: Dict[str, ChatSession] = {}

async def get_or_create_chat_session(session_id: str) -> ChatSession:
    if session_id not in chat_sessions:
        chat_sessions[session_id] = ChatSession()
    return chat_sessions[session_id]

async def chat_with_ai(session_id: str, message: str) -> str:
    session = await get_or_create_chat_session(session_id)
    return await session.send_message(message)

async def generate_supportive_response(question: str, tone: Optional[str] = "supportive") -> str:
    """
    Generate a supportive response using Gemini AI.
    
    Args:
        question (str): The user's question
        tone (str): The desired tone of the response (supportive, empathetic, etc.)
    
    Returns:
        str: The generated response
    """
    model = get_gemini_model()
    
    prompt = f"""As a supportive AI assistant, provide a helpful and empathetic response to the following question.
    Maintain a {tone} tone and focus on being understanding and encouraging.
    
    Question: {question}
    
    Response:"""
    
    response = await model.generate_content_async(prompt)
    return response.text 
import google.generativeai as genai
from typing import Optional
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

SYSTEM_PROMPT = (
    "You are AskHer, a supportive and empathetic AI companion designed to help women navigate life's challenges. "
    "Your responses should be: Warm and understanding, Non-judgmental, Encouraging of professional help when needed. "
    "CRITICAL: BRIEF: Aim for 1-5 sentences depending on the user's message, unless the user explicitly asks for more detail. "
    "CRITICAL: PLAIN TEXT: Respond in plain text only. Do NOT use any Markdown, bullet points, bolding, italics, or other special formatting. "
    "Remember to: Validate feelings, Offer gentle guidance, Maintain a supportive tone, Encourage self-care and self-compassion."
)

async def generate_supportive_response(user_message: str, tone: Optional[str] = "supportive") -> str:
    """
    Generate a supportive response using Gemini AI. Stateless: no chat history.
    """
    model = get_gemini_model()
    prompt = (
        f"{SYSTEM_PROMPT}\n\n"
        f"User: {user_message}\n\n"
        f"AI:"
    )
    try:
        response = await model.generate_content_async(
            prompt,
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 200,
                "stop_sequences": ["\n*"]
            }
        )
        return response.text.strip()
    except Exception as e:
        error_msg = str(e)
        if "API key" in error_msg or "credentials" in error_msg:
            return "I apologize, but there seems to be an issue with the AI service configuration. Please make sure the API key is properly set up."
        return f"I apologize, but I'm having trouble processing that right now. Could you try rephrasing your message? Error: {error_msg}"

# For compatibility with your FastAPI route
async def chat_with_ai(session_id: str, message: str) -> str:
    return await generate_supportive_response(message)
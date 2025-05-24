import os
from dotenv import load_dotenv
import httpx

load_dotenv() 

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

client = httpx.Client(
    base_url=f"{SUPABASE_URL}/rest/v1",
    headers={
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json"
    }
)

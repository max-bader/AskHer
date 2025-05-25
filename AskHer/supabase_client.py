from pathlib import Path
from dotenv import load_dotenv
import os
import httpx

# Load the .env file from root

env_path = Path(__file__).resolve().parents[0] / ".env"
load_dotenv(dotenv_path=env_path)


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

print("SUPABASE_URL =", SUPABASE_URL)
print("SUPABASE_SERVICE_KEY is loaded?", SUPABASE_SERVICE_KEY is not None)

client = httpx.Client(
    base_url=f"{SUPABASE_URL}/rest/v1",
    headers={
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"  # ✅ THIS IS CRITICAL
    }
)



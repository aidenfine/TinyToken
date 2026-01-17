from fastapi import FastAPI
from dotenv import load_dotenv
from app.routers.token_company_router import router as token_company_router
import os
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

api_key = os.getenv("TOKEN_COMPANY_API_KEY")
if api_key is None:
    print("No API key found, exiting...")
    os._exit(0)

app = FastAPI(title="Token Company API")

# change later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(token_company_router, prefix="/api")

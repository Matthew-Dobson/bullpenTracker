from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class Pitch(BaseModel):
    zone: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pitch")
def recieve_pitch(pitch: Pitch):
    print("Recieved: ", pitch.zone)
    return {"status": "ok", "zone": pitch.zone}

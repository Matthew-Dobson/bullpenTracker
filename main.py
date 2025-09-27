from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Pitch(BaseModel):
    zone: int

@app.post("/pitch")
def recieve_pitch(pitch: Pitch):
    print("Recieved: ", pitch.zone)
    return {"status": "ok", "zone": pitch.zone}

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from datetime import datetime, timezone

app = FastAPI()

class Pitch(BaseModel):
    zone: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500",
                   "http://localhost:5500", 
                   "http://localhost:5173", 
                   "http://127.0.0.1:5173", 
                   "http://localhost:3000",
                   "http://127.0.0.1:5500", 
                   "http://localhost:5500", 
                   "http://localhost:5173", 
                   "http://127.0.0.1:5173", 
                   "http://localhost:3000"],

    allow_methods=["*"],
    allow_headers=["*"],
)

#MVP - store session id in memory
sessions ={} #{"sid": bool, "started_at":iso, "pitch_no", int}

@app.post("/sessions/start")
def start_session():
    sid = uuid4().hex
    sessions[sid] = {"active": True, "started_at": datetime.now(timezone.utc).isoformat(), "pitch_no": 0}
    return {"sessionId": sid, "startedAt": sessions[sid]["started_at"]}

@app.post("/sessions/{sid}/end")
def end_session(sid: str):
    s = sessions.get(sid)
    if not s or not s["active"]:
        raise HTTPException(status_code=404, detail="Session not active or not found")
    s["active"] = False
    return {"ok": True, "endedAt": datetime.now(timezone.utc).isoformat()}



@app.post("/pitch")
def recieve_pitch(pitch: Pitch):
    print("Recieved: ", pitch.zone)
    return {"status": "ok", "zone": pitch.zone}

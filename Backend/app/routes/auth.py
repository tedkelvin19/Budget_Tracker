from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import User
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(data: dict, db: Session = Depends(get_db)):
    hashed = pwd_context.hash(data["password"])
    user = User(email=data["email"], password=hashed, full_name=data["full_name"])
    db.add(user)
    db.commit()
    return {"message": "User created"}

@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data["email"]).first()
    if not user or not pwd_context.verify(data["password"], user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": "dummy-token"}
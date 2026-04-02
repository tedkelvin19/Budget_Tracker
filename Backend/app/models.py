from sqlalchemy import Column, String
from app.db import Base
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True)
    password = Column(String)
    full_name = Column(String)
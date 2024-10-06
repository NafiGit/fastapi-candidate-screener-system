from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import spacy
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

class Candidate(BaseModel):
    id: int
    name: str
    email: str
    skills: List[str]
    experience: int

class InterviewQuestion(BaseModel):
    candidate_id: int
    question: str

class CandidateList(BaseModel):
    candidates: List[Candidate]

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Implement document conversion and preprocessing here
    # For this example, we'll return mock data
    mock_candidates = [
        Candidate(id=1, name="John Doe", email="john@example.com", skills=["Python", "Machine Learning"], experience=5),
        Candidate(id=2, name="Jane Smith", email="jane@example.com", skills=["Java", "Spring Boot"], experience=3),
    ]
    return mock_candidates

@app.post("/simulate-interview")
async def simulate_interview(question: InterviewQuestion):
    # Implement AI-based interview simulation here
    # For this example, we'll return a mock response
    mock_response = f"As an AI candidate, I would approach the question '{question.question}' by..."
    return {"response": mock_response}

@app.post("/rank-candidates")
async def rank_candidates(candidate_list: CandidateList):
    candidates = candidate_list.candidates
    
    # Create a job description (you can make this more dynamic in a real application)
    job_description = "We are looking for a Python developer with experience in machine learning and data analysis."

    # Prepare candidate texts
    candidate_texts = [f"{c.name} {' '.join(c.skills)} {c.experience} years experience" for c in candidates]

    # Vectorize job description and candidate texts
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([job_description] + candidate_texts)

    # Calculate cosine similarity
    cosine_similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

    # Rank candidates
    ranked_candidates = sorted(
        [
            {"name": c.name, "score": score * 100}
            for c, score in zip(candidates, cosine_similarities)
        ],
        key=lambda x: x["score"],
        reverse=True
    )

    return {"ranked_candidates": ranked_candidates}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
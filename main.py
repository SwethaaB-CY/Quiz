from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm_model import generate_mcqs  # ✅ Import the MCQ generator

app = FastAPI()

# ✅ Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Define Input Models
class QuizRequest(BaseModel):
    topic: str
    num_questions: int  

class AnswerRequest(BaseModel):
    question: str
    selected_answer: str  # ✅ User's chosen answer (A, B, C, D)
    correct_answer: str   # ✅ The actual correct answer

@app.post("/generate-quiz")
async def generate_quiz(request: QuizRequest):
    """Generate MCQs for a topic using Google Gemini."""
    try:
        if request.num_questions <= 0:
            raise HTTPException(status_code=400, detail="Number of questions must be greater than 0.")

        quiz = generate_mcqs(request.topic, request.num_questions)

        if not quiz:
            raise HTTPException(status_code=500, detail="Failed to generate quiz.")

        return {"status": "success", "quiz": quiz}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate-answer")
async def evaluate_answer(request: AnswerRequest):
    """Evaluate the user's answer and return correctness."""
    try:
        # ✅ Fix answer formatting
        user_answer = request.selected_answer.strip().upper()  # "A"
        correct_answer = request.correct_answer.strip().upper()  # "A: Option 1"

        print(f"DEBUG: User Answer - {user_answer}")  
        print(f"DEBUG: Correct Answer - {correct_answer}")  

        # ✅ Check if user's letter matches the correct answer
        is_correct = correct_answer.startswith(user_answer)

        return {
            "question": request.question,
            "selected_answer": request.selected_answer,
            "correct_answer": request.correct_answer,
            "is_correct": is_correct,
            "message": "Correct!" if is_correct else "Incorrect, try again."
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

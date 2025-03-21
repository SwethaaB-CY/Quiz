import google.generativeai as genai
import os
import json
import time
import random
from Levenshtein import ratio  # Used to check for duplicate questions

# ✅ Google Gemini API Key (Use your actual key)
API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDpI0QJMWxLdaTDRqcTw8JTDNUbz-MH6dM")

# ✅ Configure Google Gemini API
genai.configure(api_key=API_KEY)
MODEL = genai.GenerativeModel('gemini-2.0-flash')

def generate_question(topic):
    """Generate a unique MCQ using Google Gemini."""
    prompt = f"""
    Create a UNIQUE multiple-choice question about {topic} in this EXACT JSON format:
    {{
      "question": "Clear question text here",
      "choices": ["A: Option 1", "B: Option 2", "C: Option 3", "D: Option 4"],
      "correctAnswer": "A"
    }}
    - No markdown
    - Correct answer must be in choices
    - `correctAnswer` must be in the format "A", "B", "C", or "D"
    - Only output JSON
    """.strip()

    try:
        response = MODEL.generate_content(prompt)
        raw_text = response.candidates[0].content.parts[0].text.strip()
        cleaned = raw_text.replace('```json', '').replace('```', '').strip()

        data = json.loads(cleaned)

        # ✅ Ensure correct answer format
        correct_letter = data["correctAnswer"].strip().upper()  # "A"
        correct_choice = next((c for c in data["choices"] if c.startswith(f"{correct_letter}:")), None)

        if correct_choice:
            data["correctAnswer"] = correct_choice  # ✅ Now stores "A: Option 1"

        return data if len(data['choices']) == 4 else None
    except:
        return None

def is_unique(new_q, existing, threshold=0.8):
    """Check for duplicates using both exact match and similarity."""
    for q in existing:
        if new_q['question'] == q['question']:
            return False
        if ratio(new_q['question'], q['question']) > threshold:
            return False
    return True

def generate_mcqs(topic, num_questions=5):
    """Generate multiple MCQs for a given topic using Google Gemini."""
    questions = []
    attempts = 0

    while len(questions) < num_questions and attempts < 15:
        try:
            time.sleep(random.uniform(3, 7))  # ✅ Rate limiting

            q_data = generate_question(topic)

            if q_data and is_unique(q_data, questions):
                questions.append(q_data)
            else:
                attempts += 1
                time.sleep(10 if attempts % 3 == 0 else 5)

        except Exception as e:
            print(f"Error: {e}")
            attempts += 1
            time.sleep(30)

    return questions

# ✅ Test Script Execution
if __name__ == "__main__":
    topic = "Python"
    num_questions = 1
    result = generate_mcqs(topic, num_questions)
    print(json.dumps(result, indent=2))

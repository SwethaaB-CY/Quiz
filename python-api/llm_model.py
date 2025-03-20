import os
import json
import torch
import re
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load Hugging Face Token
token = os.environ.get("HF_TOKEN", "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")
model_name = "meta-llama/Llama-3.2-1B-Instruct"

# Load Model
try:
    print("Loading model...")
    model = AutoModelForCausalLM.from_pretrained(model_name, token=token)
    tokenizer = AutoTokenizer.from_pretrained(model_name, token=token)
    print("Model loaded successfully!")
except OSError as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    model, tokenizer = None, None  # Prevent further errors if loading fails


import re

import re

def parse_generated_text(text):
    lines = text.strip().split("\n")
    question = ""
    choices = []
    correct_answer = ""

    for line in lines:
        line = line.strip()
        
        # Extract question
        if line.lower().startswith("question:"):
            question = line.split(":", 1)[1].strip()
        
        # Extract choices
        elif re.match(r"^[A-D]\)", line):  # Match "A) ...", "B) ..."
            choice_text = line.strip()
            # Filter out placeholders like "A) <option 1>"
            if "<option" not in choice_text:
                choices.append(choice_text)

        # Extract correct answer
        elif line.lower().startswith("correct answer:"):
            correct_answer = line.split(":", 1)[1].strip()

    # Ensure valid data and set defaults if necessary
    if not question or not choices or not correct_answer:
        return {"error": "Invalid question generated. Please try again."}

    # Ensure the correct answer is within the choices
    if correct_answer not in choices:
        correct_answer = choices[0] if choices else ""

    return {
        "question": question,
        "choices": choices,
        "correctAnswer": correct_answer
    }





def generate_mcqs(topic, num_questions=5):
    mcqs = []
    for _ in range(num_questions):
        prompt = (
            f"Generate a multiple-choice question on the topic: {topic}.\n"
            "Format the response exactly as follows:\n\n"
            "Question: <your question here>\n"
            "A) <option 1>\n"
            "B) <option 2>\n"
            "C) <option 3>\n"
            "D) <option 4>\n"
            "Correct answer: <A/B/C/D>\n\n"
            "Ensure each option is a valid answer choice related to the question. Do not use placeholders."
        )

        inputs = tokenizer(prompt, return_tensors="pt")

        with torch.no_grad():
            outputs = model.generate(**inputs, max_new_tokens=150)

        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        mcq = parse_generated_text(generated_text)
        mcqs.append(mcq)

    return mcqs



# Test script execution
if __name__ == "__main__":
    topic = "Python"
    num_questions = 1
    result = generate_mcqs(topic, num_questions)
    print(json.dumps(result, indent=2))

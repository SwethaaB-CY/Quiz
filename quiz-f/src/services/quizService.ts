export const generateQuiz = async (topic: string, numQuestions: number) => {
    const response = await fetch(
      `http://localhost:3001/quiz/generate?topic=${topic}&num_questions=${numQuestions}`
    );
    return response.json();
  };
  
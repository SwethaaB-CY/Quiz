import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Score() {
  const router = useRouter();
  const { score, total, title } = router.query; // Make sure title is included

  useEffect(() => {
    if (score && total && title) {
      const submitQuizResult = async () => {
        try {
          const token = localStorage.getItem("token"); // Get JWT token
          await axios.post(
            "http://localhost:5000/quiz/submit", // Send to Project A
            { title, totalQuestions: Number(total), score: Number(score) },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Error saving quiz result:", error);
        }
      };

      submitQuizResult();
    }
  }, [score, total, title]);

  return (
    <div>
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {total}</p>
      <button onClick={() => router.push("/")}>Retry Quiz</button>
    </div>
  );
}

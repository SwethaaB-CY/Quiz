// src/utils/api.ts
import axios from "axios";

export const fetchToken = (): string | null => {
  return getCookie("token") || localStorage.getItem("token");
};

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export const submitQuiz = async (quizData: {
  title: string;
  totalQuestions: number;
  score: number;
}): Promise<unknown | void> => {
  const token = fetchToken();

  if (!token) {
    console.error("❌ No token found. User might be logged out.");
    alert("You are not logged in. Please log in again.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5001/quiz/submit", quizData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log("✅ Quiz submitted successfully:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error submitting quiz:", error.response?.data || error.message);
    } else {
      console.error("❌ Unknown error submitting quiz:", error);
    }
  }
};

import axios from "axios";

export const fetchToken = () => {
    return getCookie("token") || localStorage.getItem("token");
  };
  
  
  console.log("📌 Retrieved Token:", fetchToken());

  function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  }
  
  export const submitQuiz = async (quizData: { title: string; totalQuestions: number; score: number; }) => {
    const token = fetchToken(); // ✅ Use improved token fetching
  
    if (!token) {
      console.error('❌ No token found. User might be logged out.');
      alert('You are not logged in. Please log in again.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/quiz/submit', quizData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // ✅ Ensure cookies are sent
      });
  
      console.log('✅ Quiz submitted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error submitting quiz:', (error as any).response?.data || (error as any).message);
    }
  };
  
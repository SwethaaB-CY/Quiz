import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerateQuiz = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("http://localhost:8000/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, numQuestions }),
      });
  
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("Quiz Data:", data);
  
      router.push({
        pathname: "/quiz",
        query: { quizData: JSON.stringify(data.quiz) },
      });
  
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
      alert("Failed to fetch quiz. Check the backend.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      {/* Floating Icons - Increased & Scattered */}
      {[
        { emoji: "🎲", top: "10%", left: "5%" },
        { emoji: "🎯", top: "20%", right: "10%" },
        { emoji: "💡", bottom: "15%", left: "40%" },
        { emoji: "🔮", top: "60%", left: "15%" },
        { emoji: "🧩", bottom: "10%", right: "5%" },
        { emoji: "⚡", top: "50%", left: "50%" },
        { emoji: "📜", top: "30%", right: "20%" },
        { emoji: "🎵", bottom: "40%", left: "10%" },
        { emoji: "🔢", top: "70%", right: "30%" },
      ].map((icon, index) => (
        <motion.div
          key={index}
          className="icon"
          style={{
            position: "absolute",
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
          }}
          animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 6 + (index % 3), repeat: Infinity }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Quiz Form */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Quiz-F 🎮
      </motion.h1>

      <motion.input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        whileFocus={{ scale: 1.05 }}
      />

      <motion.input
        type="number"
        placeholder="Number of Questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Math.max(1, Number(e.target.value)))}
        whileFocus={{ scale: 1.05 }}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleGenerateQuiz}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Quiz 🚀"}
      </motion.button>
    </div>
  );
}

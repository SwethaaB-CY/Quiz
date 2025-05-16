// src/pages/quiz.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Quiz.module.css";
import { submitQuiz } from "@/utils/api";

const floatingIcons = [
  "📖", "✏️", "🏫", "🎓", "🖥️", "🎶", "🚀", "📜", "⚛️", "🏆", "📚", "📝", "🔢", "🌍", "💡", "🎨", "🔎", "📅"
];

export default function Quiz() {
  const router = useRouter();
  const { quizData } = router.query;
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizTitle, setQuizTitle] = useState<string>("Quiz");

  useEffect(() => {
    if (quizData) {
      try {
        const parsedData = JSON.parse(quizData as string);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setQuestions(parsedData);
        } else {
          throw new Error("Invalid quiz format.");
        }
      } catch (error) {
        console.error("Error parsing quiz data:", error);
        alert("Failed to load quiz. Redirecting...");
        router.push("/");
      }
    }

    if (router.query.topic) {
      setQuizTitle(router.query.topic as string);
    }
  }, [quizData, router.query.topic, router]);

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      if (option === questions[currentQuestion].correctAnswer) {
        setEvaluation("Correct! ✅");
        setScore((prevScore) => prevScore + 1);
      } else {
        setEvaluation("Incorrect! ❌");
      }
      setIsAnswered(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const quizSubmission = {
        title: quizTitle,
        totalQuestions: questions.length,
        score: score,
      };
      console.log("Submitting quiz:", quizSubmission);
      await submitQuiz(quizSubmission);
      alert("Quiz submitted successfully!");
    } catch (error) {
      alert("Error submitting quiz.");
    }
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setEvaluation(null);
      setIsAnswered(false);
    } else {
      await handleSubmit();
      router.push({ pathname: "/score", query: { score: score, total: questions.length } });
    }
  };

  if (questions.length === 0) {
    return <div className={styles.loading}>Loading Quiz...</div>;
  }

  return (
    <div className={styles.quizContainer}>
      {/* Floating Background Icons */}
      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          className={styles.floatingIcon}
          animate={{ x: [0, Math.random() * 40 - 20, 0], y: [0, Math.random() * 40 - 20, 0] }}
          transition={{ repeat: Infinity, duration: Math.random() * 5 + 3, ease: "easeInOut" }}
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Quiz Title */}
      <h1 className={styles.quizTitle}>{quizTitle}</h1>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        className={styles.questionCard}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{questions[currentQuestion].question}</h2>
        <p>Select the correct answer:</p>

        <div className={styles.options}>
          {questions[currentQuestion].choices.map((option: string, index: number) => (
            <motion.button
              key={index}
              className={`${styles.optionButton} ${selectedOption === option ? styles.selected : ""}`}
              onClick={() => handleOptionClick(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={selectedOption === option ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
              disabled={isAnswered}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Evaluation Message */}
        {evaluation && <p className={styles.evaluation}>{evaluation}</p>}
      </motion.div>

      {/* Next Button */}
      <motion.button
        className={styles.nextButton}
        onClick={nextQuestion}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={!isAnswered}
      >
        {currentQuestion === questions.length - 1 ? "Finish 🎉" : "Next ➡️"}
      </motion.button>
    </div>
  );
}

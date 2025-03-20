/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Quiz.module.css";

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
  const [evaluation, setEvaluation] = useState<string | null>(null); // To store correct/incorrect evaluation
  const [score, setScore] = useState(0); // To store the user's score

  // Load quiz data from query
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
  }, [quizData, router]);

  // Handle answer selection and evaluate correctness
  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);

      // Check if the selected option is correct
      if (option === questions[currentQuestion].correctAnswer) {
        setEvaluation("Correct! ✅");
        setScore((prevScore) => prevScore + 1); // Increase score for correct answer
      } else {
        setEvaluation("Incorrect! ❌");
      }
      setIsAnswered(true);
    }
  };

  // Proceed to next question or finish quiz
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setEvaluation(null);
      setIsAnswered(false);
    } else {
      // Redirect to score page with the score
      router.push({
        pathname: "/score",
        query: { score: score, total: questions.length },
      });
    }
  };

  // Show loading if questions are not loaded yet
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

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question Card with Smooth Transition */}
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
              disabled={isAnswered} // Disable button after answering
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Evaluation Message */}
        {evaluation && <p className={styles.evaluation}>{evaluation}</p>}
      </motion.div>

      {/* Next Button (Disabled when answering or on the last question) */}
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

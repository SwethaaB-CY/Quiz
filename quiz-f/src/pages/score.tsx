import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "../styles/Score.module.css"; // Adjust the path if needed

export default function Score() {
  const router = useRouter();
  const { score, total } = router.query; // Destructure score and total from query

  const handleRetry = () => {
    router.push("/"); // Redirect to the home page or quiz start page
  };

  return (
    <div className={styles.scoreContainer}>
      <motion.div
        className={styles.scoreCard}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Quiz Completed! 🎉</h1>
        <p>Your Score: {score} / {total}</p>

        <motion.button
          className={styles.retryButton}
          onClick={handleRetry}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}

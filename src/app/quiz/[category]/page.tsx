"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { api, Question } from "@/services/api";

export default function QuizPage({ params }: { params: { category: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { question, options } = await api.getQuiz(params.category);
        setQuestion(question);
        setOptions(options);
      } catch (error) {
        console.error("Failed to fetch question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [params.category]);

  const handleAnswer = async (answer: string) => {
    if (!question || selectedAnswer) return;

    setSelectedAnswer(answer);
    try {
      const result = await api.submitAnswer(question.id, answer);
      setFeedback({
        correct: result.correct,
        message: result.correct
          ? "Correct!"
          : `Wrong! The correct answer was: ${result.correctAnswer}`,
      });
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleNext = () => {
    setQuestion(null);
    setOptions([]);
    setSelectedAnswer(null);
    setFeedback(null);
    setLoading(true);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
        No questions available for this category.
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "0.5rem", 
        padding: "2rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {params.category} Quiz
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
            {question.question_text}
          </p>
        </div>

        <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className="button"
              style={{
                textAlign: "left",
                backgroundColor: selectedAnswer === option
                  ? feedback?.correct
                    ? "var(--success-color)"
                    : "var(--error-color)"
                  : "var(--background-color)",
                color: selectedAnswer === option ? "white" : "inherit",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {feedback && (
          <div style={{ 
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: feedback.correct ? "var(--success-color)" : "var(--error-color)",
            color: "white",
            borderRadius: "0.5rem"
          }}>
            {feedback.message}
          </div>
        )}

        {selectedAnswer && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => router.push("/dashboard")}
              className="button button-secondary"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleNext}
              className="button"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 
"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import F1Lights from "@/components/F1Lights";

export default function Home() {
  // App state: 'auth', 'nickname', 'lights', 'quiz'
  const [step, setStep] = useState<'auth' | 'nickname' | 'lights' | 'quiz'>('auth');
  const [nickname, setNickname] = useState("");
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [authName, setAuthName] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  // Simulate auth (in-memory only)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authName && authPass) {
      setStep('nickname');
    }
  };

  const handleNickname = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname) {
      setStep('lights');
    }
  };

  const handleLightsComplete = () => {
    setStep('quiz');
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  // Step 1: Auth
  if (step === 'auth') {
    return (
      <main className="container" style={{ padding: "2rem", display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="card" style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <h1 style={{ marginBottom: 24 }}>{authType === 'signin' ? 'Sign In' : 'Create Account'}</h1>
          <form onSubmit={handleAuth}>
            <input
              type="text"
              placeholder="Username"
              value={authName}
              onChange={e => setAuthName(e.target.value)}
              style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '1.5px solid #333', background: 'var(--background-button)', color: 'var(--secondary)', fontSize: 18 }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authPass}
              onChange={e => setAuthPass(e.target.value)}
              style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '1.5px solid #333', background: 'var(--background-button)', color: 'var(--secondary)', fontSize: 18 }}
              required
            />
            <button className="button button-primary" style={{ width: '100%', marginBottom: 12 }} type="submit">
              {authType === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <button className="button button-secondary" style={{ width: '100%' }} onClick={() => setAuthType(authType === 'signin' ? 'signup' : 'signin')}>
            {authType === 'signin' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
          </button>
        </div>
      </main>
    );
  }

  // Step 2: Nickname
  if (step === 'nickname') {
    return (
      <main className="container" style={{ padding: "2rem", display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="card" style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <h1 style={{ marginBottom: 24 }}>Choose Your Nickname</h1>
          <form onSubmit={handleNickname}>
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: '1.5px solid #333', background: 'var(--background-button)', color: 'var(--secondary)', fontSize: 18 }}
              required
            />
            <button className="button button-primary" style={{ width: '100%' }} type="submit">
              Continue
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Step 3: F1 Lights
  if (step === 'lights') {
    return (
      <main className="container" style={{ padding: "2rem", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <h1 style={{ marginBottom: 32, textAlign: 'center' }}>Get Ready, {nickname}!</h1>
        <F1Lights onComplete={handleLightsComplete} />
      </main>
    );
  }

  // Step 4: Quiz
  return (
    <main
      className="container"
      style={{
        padding: "2rem",
        position: "relative",
        minHeight: "100vh",
        background: "#111112"
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto", position: "relative", flex: 1 }}>
          {/* Red accent bar */}
          <div style={{ height: "6px", width: "100%", background: "var(--primary)", position: "absolute", top: 0, left: 0, borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }} />
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            marginBottom: "2rem",
            alignItems: "center",
            marginTop: "0.5rem"
          }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase" }}>Score: {score}</h2>
              <p style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: 1 }}>Streak: <span style={{ color: streak >= 3 ? 'var(--accent)' : 'var(--primary)' }}>{streak} 🔥</span></p>
            </div>
            <div style={{ 
              backgroundColor: "var(--background-button)", 
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              color: "var(--secondary)",
              border: "2px solid var(--primary)",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase"
            }}>
              {currentQuestion.category} • {currentQuestion.difficulty}
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem", color: "var(--secondary)", textTransform: "uppercase", letterSpacing: 2, lineHeight: 1.1 }}>
              {currentQuestion.question}
            </h1>
          </div>

          <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => !selectedAnswer && handleAnswer(option)}
                disabled={!!selectedAnswer}
                className="button"
                style={{
                  textAlign: "left",
                  backgroundColor: selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "var(--success)"
                      : "var(--error)"
                    : "var(--background-button)",
                  color: selectedAnswer === option ? "#fff" : "var(--secondary)",
                  border: selectedAnswer === option ? `2px solid ${option === currentQuestion.correctAnswer ? 'var(--success)' : 'var(--error)'}` : '2px solid transparent',
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  opacity: selectedAnswer && option !== currentQuestion.correctAnswer ? 0.7 : 1
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div style={{ 
              marginBottom: "2rem",
              padding: "1rem",
              backgroundColor: selectedAnswer === currentQuestion.correctAnswer ? "var(--success)" : "var(--error)",
              borderRadius: "0.5rem",
              color: "#fff",
              border: `1.5px solid ${selectedAnswer === currentQuestion.correctAnswer ? 'var(--success)' : 'var(--error)'}`,
              fontWeight: 500
            }}>
              <p style={{ marginBottom: "1rem" }}>{currentQuestion.explanation}</p>
              <button
                onClick={handleNext}
                className="button button-primary"
                style={{ width: "100%" }}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 
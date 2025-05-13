"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api, UserStats } from "@/services/api";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categories } = await api.getDashboard();
        setCategories(categories);
        const stats = await api.getStats();
        setStats(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
        Loading...
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
        marginBottom: "2rem"
      }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Welcome, {user?.username}!
        </h1>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1, padding: "1rem", backgroundColor: "var(--background-color)", borderRadius: "0.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Score</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{user?.score || 0}</p>
          </div>
          <div style={{ flex: 1, padding: "1rem", backgroundColor: "var(--background-color)", borderRadius: "0.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Quizzes Completed</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{user?.quizzes_completed || 0}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="button button-secondary"
        >
          Logout
        </button>
      </div>

      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "0.5rem", 
        padding: "2rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem"
      }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Quiz Categories</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {categories.map((category) => (
            <a
              key={category}
              href={`/quiz/${category}`}
              className="button"
              style={{ textAlign: "center", textDecoration: "none" }}
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {stats && (
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "0.5rem", 
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Statistics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ padding: "1rem", backgroundColor: "var(--background-color)", borderRadius: "0.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Total Questions</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.total_answered}</p>
            </div>
            <div style={{ padding: "1rem", backgroundColor: "var(--background-color)", borderRadius: "0.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Correct Answers</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.correct_answered}</p>
            </div>
            <div style={{ padding: "1rem", backgroundColor: "var(--background-color)", borderRadius: "0.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Accuracy</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.accuracy.toFixed(1)}%</p>
            </div>
          </div>

          <h3 style={{ marginBottom: "1rem" }}>Category Performance</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            {Object.entries(stats.category_stats).map(([category, stats]) => (
              <div key={category} style={{ padding: "1rem", backgroundColor: "var(--background-color)", borderRadius: "0.5rem" }}>
                <h4 style={{ marginBottom: "0.5rem" }}>{category}</h4>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Correct: {stats.correct}/{stats.total}</span>
                  <span>Accuracy: {stats.accuracy.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
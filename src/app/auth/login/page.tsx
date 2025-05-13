"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const validatedData = loginSchema.parse(formData);
      if (isLogin) {
        await login(validatedData.username, validatedData.password);
      } else {
        await register(validatedData.username, validatedData.password);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <div style={{ 
        maxWidth: "400px", 
        margin: "0 auto", 
        backgroundColor: "white", 
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
          {isLogin ? "Login" : "Register"}
        </h1>
        {error && (
          <div className="error-message" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.25rem",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="button" style={{ width: "100%", marginTop: "1rem" }}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="button button-secondary"
            style={{ background: "none", border: "none", color: "var(--primary-color)" }}
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
} 
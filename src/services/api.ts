const API_URL = 'http://localhost:5000';

export interface User {
  id: number;
  username: string;
  score: number;
  quizzes_completed: number;
  date_joined: string;
}

export interface Question {
  id: number;
  question_text: string;
  correct_answer: string;
  wrong_answers: string;
  category: string;
  difficulty: string;
  question_type: string;
}

export interface CategoryStats {
  correct: number;
  total: number;
  accuracy: number;
}

export interface UserStats {
  total_answered: number;
  correct_answered: number;
  accuracy: number;
  category_stats: Record<string, CategoryStats>;
}

export const api = {
  async login(username: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async register(username: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },

  async getDashboard(): Promise<{ user: User; categories: string[] }> {
    const response = await fetch(`${API_URL}/dashboard`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    return response.json();
  },

  async getQuiz(category: string): Promise<{ question: Question; options: string[] }> {
    const response = await fetch(`${API_URL}/quiz/${category}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }

    return response.json();
  },

  async submitAnswer(questionId: number, answer: string): Promise<{ correct: boolean; correctAnswer: string }> {
    const response = await fetch(`${API_URL}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question_id: questionId, answer }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to submit answer');
    }

    return response.json();
  },

  async getStats(): Promise<UserStats> {
    const response = await fetch(`${API_URL}/stats`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return response.json();
  },
}; 
"use client"

// This is a placeholder for a real API implementation.
// In a real application, you would use a proper API client
// to communicate with your backend.

// Fonctions client uniquement
const API_BASE_URL = '/api';

export const api = {
  // Authentication
  auth: {
    signin: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return response.json();
    },
    signup: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response.json();
    },
  },

  // Matches
  matches: {
    getUpcoming: async () => {
      const response = await fetch(`${API_BASE_URL}/main/match/upcoming`);
      return response.json();
    },
    getResults: async () => {
      const response = await fetch(`${API_BASE_URL}/main/match/results`);
      return response.json();
    },
    getStandings: async () => {
      const response = await fetch(`${API_BASE_URL}/main/match/standings`);
      return response.json();
    },
    getMatchDetails: async (matchId) => {
      const response = await fetch(`${API_BASE_URL}/main/match/${matchId}`);
      return response.json();
    },
    // Add a new match (admin/upcoming)
    addMatch: async (matchData) => {
      const response = await fetch(`${API_BASE_URL}/matches/upcoming`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData),
      });
      return response.json();
    },
    // Update a match by ID (admin/upcoming)
    updateMatch: async (matchId, matchData) => {
      const response = await fetch(`${API_BASE_URL}/matches/upcoming/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData),
      });
      return response.json();
    },
    // Delete a match by ID (admin/upcoming)
    deleteMatch: async (matchId) => {
      const response = await fetch(`${API_BASE_URL}/matches/upcoming/${matchId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
  },

  // Tickets
  tickets: {
    getMatchTickets: async (matchId) => {
      const response = await fetch(`${API_BASE_URL}/main/reservation/match/${matchId}`);
      return response.json();
    },
    getSeasonTickets: async () => {
      const response = await fetch(`${API_BASE_URL}/main/subscription/season`);
      return response.json();
    },
    createReservation: async (reservationData) => {
      const response = await fetch(`${API_BASE_URL}/main/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      return response.json();
    },
    getUserReservations: async () => {
      const response = await fetch(`${API_BASE_URL}/main/reservation/user`);
      return response.json();
    },
  },

  // Team
  team: {
    getTeamInfo: async () => {
      const response = await fetch(`${API_BASE_URL}/main/team/info`);
      return response.json();
    },
    getPlayers: async () => {
      const response = await fetch(`${API_BASE_URL}/main/team/players`);
      return response.json();
    },
  },

  // Users CRUD operations
  users: {
    // Get all users
    getUsers: async () => {
      const response = await fetch(`${API_BASE_URL}/admin/users`);
      return response.json();
    },

    // Get a single user by ID
    getUser: async (userId) => {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`);
      return response.json();
    },

    // Create a new user
    createUser: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response.json();
    },

    // Update a user
    updateUser: async (userId, userData) => {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response.json();
    },

    // Delete a user
    deleteUser: async (userId) => {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
  },
};

// Fonction utilitaire pour formater les dates de manière cohérente (version client)
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export async function login(email, password) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would authenticate against your backend
  if (email === "test@example.com" && password === "password") {
    return { success: true, message: "Login successful" }
  } else {
    return { success: false, message: "Invalid credentials" }
  }
}

export async function logout() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would invalidate the session on the backend
  return { success: true, message: "Logout successful" }
}

export async function getUserProfile() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would fetch the user profile from your backend
  if (typeof window !== 'undefined') {
  const token = localStorage.getItem("token")
  if (!token) {
    return { success: false, message: "Unauthorized" }
    }
  }

  return {
    success: true,
    data: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      createdAt: new Date().toISOString(),
    },
  }
}

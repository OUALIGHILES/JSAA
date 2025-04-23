// This is a simple in-memory database for demonstration purposes
// In a real app, you would use a real database like MongoDB, PostgreSQL, etc.

const users = []

export function createUser(userData) {
  const newUser = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    lastLogin: null,
    ...userData,
  }

  users.push(newUser)
  return { ...newUser, password: undefined } // Don't return the password
}

export function getUserByEmail(email) {
  return users.find((user) => user.email === email)
}

export function getUserById(id) {
  return users.find((user) => user.id === id)
}

export function updateUser(id, updates) {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return null
  }

  users[userIndex] = { ...users[userIndex], ...updates }
  return { ...users[userIndex], password: undefined } // Don't return the password
}

// For password reset functionality
export const resetTokens = new Map()

export function storeResetToken(email, token) {
  resetTokens.set(email, {
    token,
    expires: Date.now() + 3600000, // 1 hour
  })
}

export function validateResetToken(email, token) {
  const storedData = resetTokens.get(email)

  if (!storedData) {
    return false
  }

  if (Date.now() > storedData.expires) {
    resetTokens.delete(email)
    return false
  }

  return storedData.token === token
}

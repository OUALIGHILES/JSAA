import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonctions d'authentification
export async function signUp(email, password, userData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Fonctions pour les matchs
export async function getMatches() {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:home_team_id(*),
      away_team:away_team_id(*)
    `)
    .order('date', { ascending: true })
  return { data, error }
}

export async function getMatchById(id) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:home_team_id(*),
      away_team:away_team_id(*)
    `)
    .eq('id', id)
    .single()
  return { data, error }
}

// Fonctions pour les billets
export async function getAvailableTickets(matchId) {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      match:match_id(*)
    `)
    .eq('match_id', matchId)
    .eq('status', 'AVAILABLE')
  return { data, error }
}

export async function createReservation(matchId, userId, quantity, seatInfo) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([
      {
        match_id: matchId,
        user_id: userId,
        quantity,
        seat_info: seatInfo,
        status: 'PENDING'
      }
    ])
    .select()
  return { data, error }
}

// Fonctions pour les abonnements
export async function getUserSubscriptions(userId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      team:team_id(*)
    `)
    .eq('user_id', userId)
    .order('start_date', { ascending: false })
  return { data, error }
}

export async function createSubscription(userId, teamId, startDate, endDate, price) {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: userId,
        team_id: teamId,
        start_date: startDate,
        end_date: endDate,
        price,
        status: 'ACTIVE'
      }
    ])
    .select()
  return { data, error }
} 
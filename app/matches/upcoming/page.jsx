import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, Filter, Search, ChevronDown, Plus, Trash2, Edit, X } from "lucide-react"
import { api } from "@/lib/api"


// Simple Button component
function Button({ children, className = "", variant = "default", size = "default", disabled = false, type = "button", onClick, ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 bg-green-600 text-white hover:bg-green-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary"
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md"
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Simple Input component
function Input({ className = "", ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// Simple Card components
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border bg-white text-gray-950 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

// Simple Badge component
function Badge({ children, className = "" }) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}

// Fixed Modal Component
// Fixed Modal Component
function MatchModal({ open, onClose, onSubmit, initialData = null, isUpdate = false }) {
  const [form, setForm] = useState({
    homeTeamId: '',
    awayTeamId: '',
    place: '',
    date: '',
    time: '',
    status: ''
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          homeTeamId: initialData.homeTeam?.name || '',
          awayTeamId: initialData.awayTeam?.name || '',
          place: initialData.stadium || '',
          date: initialData.date || '',
          time: initialData.time || '',
          status: initialData.competition || ''
        });
      } else {
        setForm({
          homeTeamId: '',
          awayTeamId: '',
          place: '',
          date: '',
          time: '',
          status: ''
        });
      }
    }
  }, [open, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleClose = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900">
          {isUpdate ? 'Modifier le match' : 'Ajouter un match'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heure
          </label>
          <Input
            type="time"
            value={form.time}
            onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compétition
            </label>
            <Input
              placeholder="Nom de la compétition"
              value={form.status}
              onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              {isUpdate ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default function UpcomingMatchesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const response = await api.matches.getUpcoming()
        if (response?.data) {
          setMatches(response.data)
        }
      } catch (err) {
        console.error('Error fetching matches:', err)
        setError(err.message || 'Une erreur est survenue lors du chargement des matchs')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  // Add match handler
  const handleAddMatch = async (data) => {
    try {
      setLoading(true)
      await api.matches.addMatch(data)
      setShowAddModal(false)

      // Refresh matches
      const response = await api.matches.getUpcoming()
      setMatches(response?.data || [])
    } catch (err) {
      console.error('Error adding match:', err)
      setError('Erreur lors de l\'ajout du match')
    } finally {
      setLoading(false)
    }
  }

  // Update match handler
  const handleUpdateMatch = async (data) => {
    try {
      if (!selectedMatch) return

      setLoading(true)
      await api.matches.updateMatch(selectedMatch.id, data)
      setShowUpdateModal(false)
      setSelectedMatch(null)

      // Refresh matches
      const response = await api.matches.getUpcoming()
      setMatches(response?.data || [])
    } catch (err) {
      console.error('Error updating match:', err)
      setError('Erreur lors de la mise à jour du match')
    } finally {
      setLoading(false)
    }
  }

  // Delete match handler
  const handleDeleteMatch = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce match ?')) {
      return
    }

    try {
      setLoading(true)
      await api.matches.deleteMatch(id)

      // Refresh matches
      const response = await api.matches.getUpcoming()
      setMatches(response?.data || [])
    } catch (err) {
      console.error('Error deleting match:', err)
      setError('Erreur lors de la suppression du match')
    } finally {
      setLoading(false)
    }
  }
  // Handle edit button click
  const handleEditClick = (match) => {
    setSelectedMatch(match)
    setShowUpdateModal(true)
  }

  // Handle modal close
  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false)
    setSelectedMatch(null)
  }

  const filteredUpcomingMatches = matches
    .filter((match) => {
      if (!match) return false
      if (activeFilter === "all") return true
      if (activeFilter === "league" && match.competition === "Algerian Ligue 1") return true
      if (activeFilter === "cup" && match.competition === "Algerian Cup") return true
      if (activeFilter === "champions" && match.competition === "CAF Champions League") return true
      return false
    })
    .filter((match) => {
      if (!match || !searchQuery) return true
      const homeTeamName = match.homeTeam?.name?.toLowerCase() || ''
      const awayTeamName = match.awayTeam?.name?.toLowerCase() || ''
      const competition = match.competition?.toLowerCase() || ''
      const query = searchQuery.toLowerCase()

      return (
        homeTeamName.includes(query) ||
        awayTeamName.includes(query) ||
        competition.includes(query)
      )
    })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add Match Button */}
      <div className="flex justify-end p-4">
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white"
        >
          <Plus className="h-4 w-4" />
          Ajouter un match
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <div className="w-full h-full bg-gradient-to-r from-green-700 to-green-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4">
            Matchs à Venir
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Consultez tous les prochains matchs de la Jeunesse Sportive de Kabylie
          </p>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Prochains Matchs</h2>
              <p className="text-gray-600">Ne manquez aucun de nos prochains matchs</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un match..."
                  className="pl-10 pr-4 py-2 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full md:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filtrer
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>

                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 border">
                    <div className="py-1">
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${activeFilter === "all" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                        onClick={() => {
                          setActiveFilter("all")
                          setShowFilters(false)
                        }}
                      >
                        Toutes les compétitions
                      </button>
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${activeFilter === "league" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                        onClick={() => {
                          setActiveFilter("league")
                          setShowFilters(false)
                        }}
                      >
                        Ligue 1 Algérienne
                      </button>
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${activeFilter === "cup" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                        onClick={() => {
                          setActiveFilter("cup")
                          setShowFilters(false)
                        }}
                      >
                        Coupe d'Algérie
                      </button>
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${activeFilter === "champions" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                        onClick={() => {
                          setActiveFilter("champions")
                          setShowFilters(false)
                        }}
                      >
                        Ligue des Champions CAF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredUpcomingMatches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun match trouvé correspondant à vos critères.</p>
              <Button
                variant="link"
                className="mt-2 text-green-600"
                onClick={() => {
                  setActiveFilter("all")
                  setSearchQuery("")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcomingMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
                  <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-3 px-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-yellow-300" />
                      <span className="text-sm font-medium">
                        {new Date(match.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-300" />
                      <span className="text-sm font-medium">{match.time}</span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <Badge className="self-start mb-4 bg-yellow-500 hover:bg-yellow-600 text-xs text-black">
                      {match.competition}
                    </Badge>

                    <div className="flex items-center justify-between mb-6 flex-grow">
                      <div className="flex flex-col items-center">
                        <div className="mb-3">
                          <img
                            src={match.homeTeam.logoUrl}
                            alt={match.homeTeam.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <span className="font-bold text-sm text-center">{match.homeTeam.name}</span>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold text-gray-400">VS</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="mb-3">
                          <img
                            src={match.awayTeam.logoUrl}
                            alt={match.awayTeam.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <span className="font-bold text-sm text-center">{match.awayTeam.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>{match.stadium}</span>
                    </div>

                    {match.ticketsAvailable ? (
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-semibold py-3 rounded-lg transition-all duration-300 mb-3">
                        Réserver des Billets
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-gray-100 text-gray-500 font-semibold py-3 rounded-lg cursor-not-allowed mb-3"
                        disabled
                      >
                        Billets bientôt disponibles
                      </Button>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(match)}
                        className="flex-1 flex items-center justify-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteMatch(match.id)}
                        className="flex-1 flex items-center justify-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Ne manquez pas l'action !</h2>
              <p className="text-white/90 max-w-xl">
                Réservez vos billets dès maintenant pour tous les prochains matchs de la JSK au Stade Hocine Ait Ahmed.
              </p>
            </div>
            <div>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold px-8 py-3 rounded-lg shadow-lg">
                Réserver des Billets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MatchModal
        open={showAddModal}
        onClose={handleCloseAddModal}
        onSubmit={handleAddMatch}
      />

      <MatchModal
        open={showUpdateModal}
        onClose={handleCloseUpdateModal}
        onSubmit={handleUpdateMatch}
        initialData={selectedMatch}
        isUpdate={true}
      />
    </div>
  )
}
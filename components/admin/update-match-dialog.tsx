import { useState, useEffect } from "react"

interface UpdateMatchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  match: {
    id: string
    homeTeamId: string
    awayTeamId: string
    date: string
    place: string
    status: string
  } | null
  onSubmit: (data: any) => void
  teams?: Array<{ id: string; name: string }>
}

export default function UpdateMatchDialog({ open, onOpenChange, match, onSubmit, teams = [] }: UpdateMatchDialogProps) {
  const [formData, setFormData] = useState({
    homeTeamId: "",
    awayTeamId: "",
    date: "",
    place: "",
    status: "SCHEDULED"
  })

  // Format date for datetime-local input (YYYY-MM-DDThh:mm)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      
      // Format as YYYY-MM-DDThh:mm
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
      console.error("Date formatting error:", e);
      return "";
    }
  };

  useEffect(() => {
    if (match) {
      setFormData({
        homeTeamId: match.homeTeamId || "",
        awayTeamId: match.awayTeamId || "",
        date: formatDateForInput(match.date || ""),
        place: match.place || "",
        status: match.status || "SCHEDULED"
      })
    }
  }, [match])

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!match || !open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        {/* Dialog Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Modifier le match
          </h2>
          <p className="text-sm text-gray-600">
            Modifiez les informations du match sélectionné.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Home Team */}
          <div className="space-y-2">
            <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-700">
              Équipe à domicile
            </label>
            <select
              id="homeTeam"
              value={formData.homeTeamId}
              onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Away Team */}
          <div className="space-y-2">
            <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700">
              Équipe à l'extérieur
            </label>
            <select
              id="awayTeam"
              value={formData.awayTeamId}
              onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date et heure
            </label>
            <input
              id="date"
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Place */}
          <div className="space-y-2">
            <label htmlFor="place" className="block text-sm font-medium text-gray-700">
              Lieu
            </label>
            <input
              id="place"
              type="text"
              value={formData.place}
              onChange={(e) => setFormData({ ...formData, place: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Statut
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="SCHEDULED">Programmé</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="COMPLETED">Terminé</option>
              <option value="CANCELLED">Annulé</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
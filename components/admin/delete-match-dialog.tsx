interface DeleteMatchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  match: {
    id: string
    homeTeam: {
      name: string
    }
    awayTeam: {
      name: string
    }
  } | null
  onDelete: (matchId: string) => void
}

export default function DeleteMatchDialog({ open, onOpenChange, match, onDelete }: DeleteMatchDialogProps) {
  const handleDelete = () => {
    if (match) {
      onDelete(match.id);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!match || !open) {
    return null;
  }
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        {/* Dialog Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Supprimer le match
          </h2>
          <p className="text-sm text-gray-600">
            Cette action ne peut pas être annulée.
          </p>
        </div>

        {/* Dialog Content */}
        <div className="py-4">
          <p className="text-gray-900">
            Êtes-vous sûr de vouloir supprimer le match entre {match.homeTeam?.name || '?'} et{" "}
            {match.awayTeam?.name || '?'} ?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cette action est irréversible et supprimera également tous les billets associés à ce match.
          </p>
        </div>

        {/* Dialog Footer */}
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
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
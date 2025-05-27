interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    name: string
  } | null
  onDelete: (userId: string) => void
}

export default function DeleteUserDialog({ open, onOpenChange, user, onDelete }: DeleteUserDialogProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!user || !open) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        {/* Dialog Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Supprimer l'utilisateur
          </h2>
        </div>

        {/* Dialog Content */}
        <div className="py-4">
          <p className="text-gray-900">
            Êtes-vous sûr de vouloir supprimer l'utilisateur {user.name} ?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cette action est irréversible et supprimera également tous les billets associés à cet utilisateur.
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
            onClick={() => onDelete(user.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
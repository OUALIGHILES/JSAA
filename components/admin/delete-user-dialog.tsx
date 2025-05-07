import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    name: string
  } | null
  onDelete: (userId: string) => void
}

export function DeleteUserDialog({ open, onOpenChange, user, onDelete }: DeleteUserDialogProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer l'utilisateur</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Êtes-vous sûr de vouloir supprimer l'utilisateur {user.name} ?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Cette action est irréversible et supprimera également tous les billets associés à cet utilisateur.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={() => onDelete(user.id)}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
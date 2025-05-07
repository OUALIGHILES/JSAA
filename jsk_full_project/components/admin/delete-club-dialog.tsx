import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteClubDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  club: {
    id: string
    name: string
  } | null
  onDelete: (clubId: string) => void
}

export function DeleteClubDialog({ open, onOpenChange, club, onDelete }: DeleteClubDialogProps) {
  if (!club) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le club</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Êtes-vous sûr de vouloir supprimer le club {club.name} ?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Cette action est irréversible et supprimera également tous les matchs associés à ce club.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={() => onDelete(club.id)}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
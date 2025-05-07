import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

export function DeleteMatchDialog({ open, onOpenChange, match, onDelete }: DeleteMatchDialogProps) {
  if (!match) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le match</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Êtes-vous sûr de vouloir supprimer le match entre {match.homeTeam.name} et{" "}
            {match.awayTeam.name} ?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Cette action est irréversible et supprimera également tous les billets associés à ce match.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={() => onDelete(match.id)}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
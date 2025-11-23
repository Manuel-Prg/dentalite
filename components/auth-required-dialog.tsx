import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserPlus, LogIn, AlertCircle } from "lucide-react"
import Link from "next/link"

interface AuthRequiredDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AuthRequiredDialog({ open, onOpenChange }: AuthRequiredDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-sky-100">
                        <AlertCircle className="w-6 h-6 text-sky-600" />
                    </div>
                    <DialogTitle className="text-center text-2xl">
                        Inicia sesión para continuar
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Para agendar una cita necesitas tener una cuenta. Esto nos permite guardar tu historial y brindarte un mejor servicio.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-4">
                    <Button asChild className="w-full bg-sky-600 hover:bg-sky-700 h-11">
                        <Link href="/pacientes">
                            <LogIn className="mr-2 h-4 w-4" />
                            Iniciar sesión
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-11">
                        <Link href="/pacientes">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Crear cuenta nueva
                        </Link>
                    </Button>
                </div>

                <DialogFooter className="sm:justify-center mt-4">
                    <p className="text-sm text-slate-500 text-center">
                        Es rápido y gratuito. Solo te tomará un minuto.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

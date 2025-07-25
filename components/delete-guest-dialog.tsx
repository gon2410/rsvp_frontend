"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    id: number;
    name: string;
    lastname: string;
}

const DeleteGuestDialog = ({id, name, lastname}: Props) => {
    const router = useRouter();

    const submitAction = async() => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-guest`, {
            method: "POST",
            credentials: "include",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                id: id,
            }),
        })
        
        const data = await response.json();

        if (response.ok) {
            router.refresh();
        } else {
            console.log(data.detail)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger><Trash size={15}/></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro que desea eliminar a {name} {lastname}</AlertDialogTitle>
                <AlertDialogDescription>
                    El invitado será borrado de forma permanente
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form action={submitAction}>
                    <AlertDialogAction type="submit" className="bg-destructive">Eliminar</AlertDialogAction>
                </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteGuestDialog;
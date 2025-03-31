"use client"

import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteJournalEntry } from '@/actions/journal';
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeleteDialog = ({ entryId }) => {
    const router = useRouter();
    const {
        loading: isDeleting,
        fn: deleteJournalFn,
        data: deletedJournal,
    } = useFetch(deleteJournalEntry);

    const [open, setopen] = useState(false);

    const handleDelete = async () => {
        if (!entryId) {
          toast.error("Journal ID is missing. Unable to delete.");
          return;
        }
      
        router.push("/dashboard"); // Redirect first to prevent fetch issues
        await deleteJournalFn({ id:entryId });
      
      };
    useEffect(() => {
        if (deletedJournal && !isDeleting) {
            setopen(false);
            toast.success("Journal Entry Deleted successfully");
            router.push(`/collections/${deletedJournal.collectionId?deletedJournal.collectionId:"unorganized"}`);
        }
    }, [deletedJournal, isDeleting, router]);

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setopen}>
                <AlertDialogTrigger asChild>
                    <Button variant={"destructive"} size={"sm"}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your Journal Entry
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setopen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                onClick={handleDelete}
                                className={"bg-red-500 hover:bg-red-600"}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDialog;

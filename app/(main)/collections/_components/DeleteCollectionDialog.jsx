"use client";
import { deleteCollection } from "@/actions/collection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteCollectionDialog = ({ entriesCount, collection }) => {
  const router = useRouter();
  const {
    loading: isDeleting,
    fn: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection);
  const handleDelete = async () => {
    if (!collection?.id) {
      toast.error("Collection ID is missing. Unable to delete.");
      return;
    }

    await deleteCollectionFn({ collectionId: collection.id });
  };
  
  const [open, setopen] = useState(false);
  useEffect(() => {
    if (deletedCollection && !isDeleting) {
      setopen(false);
      toast.error(
        `Collection ${collection.name} is deleted and all its entries`
      );
      router.push("/dashboard");
    }
  }, [deletedCollection, isDeleting]);

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
            <AlertDialogTitle>
              Delete &quot;{collection.name}&quot;
            </AlertDialogTitle>
            <div className="text-muted-foreground space-y-2">
              <p className="">This will permentaly delete:</p>
              <ul className="list-disc list-inside">
                <li className="">
                  The Collection &quot;{collection.name}&quot;{" "}
                </li>
                <li className="">
                  {entriesCount} journal{" "}
                  {entriesCount === 1 ? "entry" : "entries"}
                </li>
              </ul>
              <p className="text-red-500 font-semibold">
                This action Cannot be undone
              </p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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

export default DeleteCollectionDialog;

"use client";
import { collectionSchema } from "@/app/lib/Schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoader } from "react-spinners";

const CollectionForm = ({ loading, open, setOpen, onSuccess }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    onSuccess(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>

        {loading && <BarLoader color="orange" width="100%" />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6">
            <label>Collection Name</label>
            <Input
              disabled={loading}
              placeholder="Enter Collection Name"
              {...register("name")}
              className={`text-sm ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-6">
            <label>Description</label>
            <Textarea
              disabled={loading}
              {...register("description")}
              placeholder="Describe your Collection"
              className={`text-sm ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant={"journal"} disabled={loading}>
              Create Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionForm;

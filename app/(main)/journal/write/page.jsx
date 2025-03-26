"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { journalSchema } from "@/app/lib/Schema";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { getMoodById, MOODS } from "@/app/lib/mood";
import { Button } from "@/components/ui/button";
import { createJournalEntry } from "@/actions/journal";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";
import { createCollection, getCollection } from "@/actions/collection";
import CollectionForm from "@/components/CollectionForm";

const page = () => {
  const [isCollectionDailogOpen, setisCollectionDailogOpen] = useState(false);
  const {
    fn: actionFn,
    loading: actionLoading,
    data: actionResult,
  } = useFetch(createJournalEntry);
  const {
    fn: createCollectionFn,
    loading: createCollectionLoading,
    data: createdCollection,
  } = useFetch(createCollection);
  const {
    fn: fetchCollectionFn,
    loading: collectionsLoading,
    data: collections,
  } = useFetch(getCollection);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });
  
  const submit = async (data) => {
    const mood = getMoodById(data.mood);
    actionFn({ ...data, moodScore: mood.score, moodQuery: mood.pixabayQuery });
  };

  const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

  const selectedMood = useWatch({ control, name: "mood" });
  const prompt = getMoodById(selectedMood)?.prompt || "Write Your Thoughts";

  useEffect(() => {
    if (actionResult && !actionLoading) {
      router.push(
        `/collections/${
          actionResult.collectionId
            ? "actionResult.collectionId"
            : "Unorganized"
        }`
      );
      toast.success("Entry Created Successfully");
    }
  }, [actionResult, actionLoading]);
  
  useEffect(() => {
    fetchCollectionFn();
  }, []);
  
  useEffect(() => {
    if (createdCollection) {
      setisCollectionDailogOpen(false);
      fetchCollectionFn();
      setValue("collectionId", createdCollection.id);
      toast.success(`Collection ${createdCollection.name} created`);
    }
  }, [createdCollection]);

  const handleCreateCollection = async (data) => {
    createCollectionFn(data);
  };

  const isLoading = actionLoading || collectionsLoading;

  return (
    <div className="py-8">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
        <h1 className="text-5xl md:text-6xl gradient-title">
          What&apos;s on Your Mind
        </h1>

        {isLoading && <BarLoader color="orange" width={"100%"} />}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            {...register("title")}
            placeholder="Give your entry a title"
            className={`py-5 md:text-md ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            How are you Feeling Today
          </label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`${errors.mood ? "border-red-500" : ""} w-full`}
                >
                  <SelectValue placeholder="Select Your Mood" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MOODS).map((mood) => (
                    <SelectItem key={mood.id} value={mood.id}>
                      {mood.emoji} {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.mood && (
            <p className="text-red-500 text-sm">{errors.mood.message}</p>
          )}
        </div>

        <div className="flex space-y-4">
          <Button disabled={isLoading} variant={"journal"} type="submit">
            Publish
          </Button>
        </div>
      </form>
      <CollectionForm
        loading={createCollectionLoading}
        open={isCollectionDailogOpen}
        setOpen={setisCollectionDailogOpen}
        onSuccess={handleCreateCollection}
      />
    </div>
  );
};

export default page;

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
import { Controller, set, useForm, useWatch } from "react-hook-form";
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
    console.log(data);

    const mood = getMoodById(data.mood);
    actionFn({ ...data, moodScore: mood.score, moodQuery: mood.pixabayQuery });
  };

  const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

  // ✅ Use useWatch to reactively get the selected mood
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
      toast.success("Entry Created Suceesfully");
    }
  }, [actionResult, actionLoading]);
  useEffect(() => {
    fetchCollectionFn();
  }, []);
  useEffect(() => {
    if(createdCollection){
      setisCollectionDailogOpen(false)
      fetchCollectionFn()
      setValue("collectionId",createdCollection.id)
toast.success(`Collection ${createdCollection.name} created`)
    }

  }, [createdCollection]);
  console.log("collections", collections);

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

        {/* Title Input */}
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

        {/* Mood Selector */}
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

        {/* Writing Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{prompt}</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                readOnly={isLoading}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "itallic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        {/* Adding to collection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Add to Your Collections</label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value == "new") {
                    setisCollectionDailogOpen(true);
                  } else {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger
                  className={`${errors.mood ? "border-red-500" : ""} w-full`}
                >
                  <SelectValue placeholder="Choose a Collection...." />
                </SelectTrigger>
                <SelectContent>
                  {collections?.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                  <SelectItem value={"new"}>
                    <span className="text-orange-600">
                      + Create New Collection
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.collectionId && (
            <p className="text-red-500 text-sm">
              {errors.collectionId.message}
            </p>
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

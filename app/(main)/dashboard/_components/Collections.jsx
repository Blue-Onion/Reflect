"use client";
import { useEffect, useState } from "react";
import CollectionPreview from "./CollectionPreview";
import { createCollection } from "@/actions/collection";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";

import CollectionForm from "@/components/CollectionForm";

const Collections = ({ collections = [], entriesByCollection }) => {
 
  
  const [isCollectionDaiogOpen, setisCollectionDaiogOpen] = useState(false);
  const {
      fn: createCollectionFn,
      loading: createCollectionLoading,
      data: createdCollection,
    } = useFetch(createCollection);
    useEffect(() => {
      if(createdCollection){
        setisCollectionDaiogOpen(false);

   toast.success(`Collection ${createCollection.name} is created sucessfully`)
      }
    }, [createdCollection])
    
  const handleCreateCollection=async() => {
    createCollectionFn(data)
  }
  console.log(collections);
  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl gradient-title font-bold">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CollectionPreview
        isCreateNew={true}
        onCreateNew={() => {setisCollectionDaiogOpen(true)
          console.log(isCollectionDaiogOpen);
          
        }}
      />
      {entriesByCollection?.unorganized?.length > 0 && (
        <CollectionPreview
          name="unorganized"
          isUnorganized={true}
          entries={entriesByCollection.unorganized}
        />
      )}
      {collections.map((collection) => (
        <CollectionPreview
          key={collection.id}
          id={collection.id}
          name={collection.name}
          entries={entriesByCollection[collection.id] || []}
        />
      ))}
      </div>
      <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDaiogOpen}
          setOpen={setisCollectionDaiogOpen}
        />

    </section>
  );
};

export default Collections;

import { getCollection } from "@/actions/collection";
import { getJournalEntry } from "@/actions/journal";
import React from "react";
import Collections from "./_components/Collections";

const page = async () => {
  const collections = await getCollection();
  const entriesData = await getJournalEntry();
  const entriesByCollection = entriesData?.data?.entries.reduce(
    (acc, entry) => {
      const collectionId = entry.collectionId || "unorganized";
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );
console.log(entriesByCollection);


  return (
    <div className="px-4 py-4 space-y-8">
      <section className="space-y-4">Mood Analytic Section</section>
      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />
    </div>
  );
};

export default page;

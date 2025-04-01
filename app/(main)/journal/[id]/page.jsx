import { getOneJournalEntry } from "@/actions/journal";
import { getMoodById } from "@/app/lib/mood";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

import DeleteDialog from "./_components/DeleteDialog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const page = async ({ params }) => {
  const { id } = await params;
  const entry = await getOneJournalEntry({ id: id })
  const mood = await getMoodById(entry.mood);

  if (!entry) {
    return (
      <div className="p-6 text-center text-gray-500">
        Journal entry not found or has been deleted.
      </div>
    );
  }
  
  return (
    <>
      {entry.moodImageUrl && (
        <div className="relative h-48 w-full md:h-64">
          <Image
            src={entry.moodImageUrl}
            alt="Mood Visulization"
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-5xl font-bold gradient-title">
                {entry.title}
              </h1>
              <p className="text-gray-500">
                Created at {format(new Date(entry.createdAt), "PPP")}
              </p>
            </div>
            <div className="flex items-center gap-2">

              <DeleteDialog entryId={id} />
            </div>
          </div>
            <div className="flex gap-3">
              {entry.collections && (
                <Link href={`/collection/${entry.collections.id}`}>
                  <Badge>Collection:-{entry.collections.name}</Badge>
                </Link>
                
              )}
              <Badge variant={"outline"}
               style={{
                backgroundColor: `var(--${mood?.color}-50)`,
                color: `var(--${mood?.color}-700)`,
                borderColor: `var(--${mood?.color}-200)`,
              }}
              >
                Feeling {mood?.label}
              </Badge>
            </div>
            <hr/>
            <div className="ql-snow">
              <div className="ql-editor" dangerouslySetInnerHTML={{__html:entry.content}}/>
            </div>
            <div className="text-gray-500 text-sm pt-4 border-t">
              Last Update at {format(new Date(entry.updatedAt),"PPP 'at' p")}
            </div>
        </div>
      </div>
    </>
  );
};

export default page;

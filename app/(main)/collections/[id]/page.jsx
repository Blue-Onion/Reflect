import { getOneCollection } from '@/actions/collection';
import { getJournalEntry } from '@/actions/journal';
import React from 'react'
import DeleteCollectionDialog from '../_components/DeleteCollectionDialog';
import JournalFilter from '../_components/JournalFilter';

const CollectionPage = async({params}) => {
  const {id}=await params;
  console.log(id);
  
  const entries=await getJournalEntry({collectionId:id})
  const collection=await getOneCollection({collectionId:id})
  console.log(entries);
  console.log(collection);
  
  return (
   <div className="mt-6">
    <div className="flex flex-col justify-between">
      <div className="flex justify-between">
        <h1 className="text-4xl gradient-title font-bold">
          {id==="unorganized"?"Unorganized Entries":collection?.name||"Collection"}
        </h1>
        {collection&&<DeleteCollectionDialog
        collection={collection}
        entiresCount={entries.data.entries.length}
        />}
      </div>
      {collection?.description&&(
        <h2 className="font-extralight pl-2">{collection?.description}</h2>
      )}
    </div>
    <JournalFilter 
    entries={entries.data.entries}
    />
   </div>
  )
}

export default CollectionPage

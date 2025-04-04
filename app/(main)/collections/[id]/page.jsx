import { getOneCollection } from '@/actions/collection';
import { getJournalEntry } from '@/actions/journal';
import React from 'react'
import DeleteCollectionDialog from '../_components/DeleteCollectionDialog';
import JournalFilter from '../_components/JournalFilter';

const CollectionPage = async({params}) => {
  const {id}=await params;

  
  const entries=await getJournalEntry({collectionId:id})
  const collection=await getOneCollection({collectionId:id})


  
  return (
   <div className="mt-6">
    <div className="flex flex-col justify-between">
      <div className="flex justify-between">
        <h1 className="text-4xl gradient-title font-bold">
          {id==="unorganized"?"Unorganized Entries":collection?.name||"Collection"}
        </h1>
        {collection&&<DeleteCollectionDialog
        collection={collection}
        entriesCount={entries?.data?.entries?.length || 0
        }
        />}
      </div>
      {collection?.description&&(
        <h2 className="font-extralight my-4 pl-2">{collection?.description}</h2>
      )}
    </div>
    <JournalFilter className="mt-4"
    entries={entries.data.entries}
    />
   </div>
  )
}

export default CollectionPage

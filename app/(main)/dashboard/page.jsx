import { getCollection } from '@/actions/collection';
import { getJournalEntry } from '@/actions/journal';
import React from 'react'

const page = async() => {
  const collections=await getCollection()
  const entriesData=await getJournalEntry()
  const entriesByCollection=entriesData?.data?.entries.reduce(
    (acc,entry) => {
    const collectionId=entry.collectionId||"unorganized";
    if(!acc[collectionId]){
      acc[collectionId]=[];
    }
    acc[collectionId].push(entry)
    return acc;
  },{}
  )
  console.log("Entry By data",entriesByCollection);
  
  return (
    <div>
      Its not nice

    </div>
  )
}

export default page;

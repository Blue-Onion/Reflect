import { getOneJournalEntry } from '@/actions/journal';
import { getMoodById } from '@/app/lib/mood';
import Image from 'next/image';
import React from 'react'

const page = async({params}) => {
  const {id}=await params;
  const entry=await getOneJournalEntry({id:id})
  const mood=await getMoodById(entry.mood)
  console.log("entry:-",entry);
  console.log("mood:-",mood);
  
  return (
    <>
      {entry.moodImageUrl&&(
        <div className="relative h-48 w-full md:h-64">
          <Image
          
          src={entry.moodImageUrl}
          alt='Mood Visulization'
          className='object-cover'
          fill
          priority
          />
        </div>
      )}
    </>
  )
}

export default page

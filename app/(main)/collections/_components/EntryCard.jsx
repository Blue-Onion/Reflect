import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react'

const EntryCard = ({entry}) => {
    console.log(entry);
    
  return (
    <Link href={`/journal/${entry.id}`}>
    
    <Card className={"hover:shadow-md transition-shadow"}>
      <CardContent className={"p-6"}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-2xl">{entry.moodData.emoji}</span>
              <h3 className="font-semibold text-lg">
                {entry.title}
              </h3>
            </div>
            <div
            className='text-gray-600 line-clamp-2'
            dangerouslySetInnerHTML={{ __html:entry.content }}
            />
            <time className='text-sm text-gray-500'>
              {format(new Date(entry.createdAt),"MMM d, yyyy")}
            </time>
          {entry.collections&&(
            <div className="mt-4 flex items-center gap-2">
                <span className="text-sm px-2 py-1 bg-orange-100 text-orange-600 rounded-lg">
                  {entry.collections.name}
                </span>
            </div>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

export default EntryCard

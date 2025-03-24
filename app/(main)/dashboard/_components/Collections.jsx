"use client"
import { useState } from "react"
import CollectionPreview from "./CollectionPreview"

const Collections = ({collections=[],entriesByCollection}) => {
    const [isCollectionDaiogOpen, setisCollectionDaiogOpen] = useState(false)
  return (
    <section>
      <h2 className="text-3xl gradient-title font-bold">Collections</h2>
      <CollectionPreview
      isCreateNew={true}
      onCreateNew={()=>setisCollectionDaiogOpen(true)}
      />
      {entriesByCollection?.unoraganised?.length>0&&(
        <CollectionPreview
        name="unoraganised"
        entries={entriesByCollection.unoraganised}
        />
      )}
      {collections.map((collection) => (
 <CollectionPreview
 key={collection.id}
 id={collection.id}
 name="unoraganised"
 entries={entriesByCollection[collection.id]||[]}
 />
      )
      )}
    </section>
  )
}

export default Collections

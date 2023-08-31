import React from 'react'

function Topbuttons({setQuery}) {
    const cities =[{
        id:1,
        title:'London'
    },
    {
        id:2,
        title:'Sydney'
    },
    {
        id:1,
        title:'Tokyo'
    },
    {
        id:1,
        title:'Toronto'
    },
    {
        id:1,
        title:'Paris'
    },
]
  return (
    <div className="flex justify-around items-center my-6 ">
        {cities.map((city) => (
            <button key={city.id} className="text-white text-lg font-medium transition ease-out hover:scale-125" onClick={() => setQuery({q:city.title})}>{city.title}</button>
        ))}

      
    </div>
  )
}

export default Topbuttons

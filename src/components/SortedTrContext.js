import React, {useState, createContext} from 'react'


export const SortedTrContext = createContext()



export function SortedTrProvider ( props ){

    const [sortedTr, setSortedTr] = useState([])

    

    return (

        <div>
            <SortedTrContext.Provider value={[sortedTr, setSortedTr]}>
                {props.children}
            </SortedTrContext.Provider>
        </div>

    )
}
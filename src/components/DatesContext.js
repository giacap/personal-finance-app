import React, {useState, createContext} from 'react'


export const DatesContext = createContext()



export function DatesProvider( props ){

    const [dates, setDates] = useState([])

    

    return (

        <div>
            <DatesContext.Provider value={[dates, setDates]}>
                {props.children}
            </DatesContext.Provider>
        </div>

    )
}
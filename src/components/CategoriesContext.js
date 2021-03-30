import React, {useState, createContext} from 'react'


export const CategoriesContext = createContext()



export function CategoriesProvider( props ){

    const [categories, setCategories] = useState([])

    

    return (

        <div>
            <CategoriesContext.Provider value={[categories, setCategories]}>
                {props.children}
            </CategoriesContext.Provider>
        </div>

    )
}
import React, {useState, createContext} from 'react'


export const ExpenseCatContext = createContext()



export function ExpenseCatProvider( props ){

    const [expenseCat, setExpenseCat] = useState([])

    

    return (

        <div>
            <ExpenseCatContext.Provider value={[expenseCat, setExpenseCat]}>
                {props.children}
            </ExpenseCatContext.Provider>
        </div>

    )
}
import React, {useState, createContext, useEffect} from 'react'


export const TransactionsContext = createContext()



export function TransactionsProvider( props ){

    

    const [transactions, setTransactions] = useState([])

    
    




    return (

        <div>
            <TransactionsContext.Provider value={[transactions, setTransactions]}>
                {props.children}
            </TransactionsContext.Provider>
        </div>

    )
}
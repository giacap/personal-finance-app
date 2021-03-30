import React, {useContext, useState, useEffect} from 'react'
import { DatesContext } from './DatesContext'
import {SortedTrContext} from './SortedTrContext'
import { TransactionsContext } from './TransactionsContext'



function SingleTransaction({description, index, category, type, amount, date, element}){

    
    const [sortedTr, setSortedTr] = useContext(SortedTrContext)
    const [transactions, setTransactions] = useContext(TransactionsContext)

    const [dates, setDates] = useContext(DatesContext)



    



    function deleteItem(){

        
        

        let y = sortedTr.filter(function(item){
            return item.id !== element.id
        })
        
        setSortedTr(y)
        setTransactions(y)

        let arr = dates
        console.log(element)
        console.log(dates)
        arr.forEach(function(item, index){
            if(item.nome == element.date){
                item.value = item.value - element.amount
                if(item.value == 0){
                    arr.splice(index, 1)
                }
            }
        })

        setDates(arr)
        
    
    }





    return (
        
        <li className='transaction-li'>
            <div>
                <p className='main-text'>{description}</p>
                <p className='sec-text'>{category}</p>
            </div>
            <div>
                <p className={type === 'income' ? 'green-text' : 'red-text'}>€ {amount}</p>
                <p className='sec-text'>{date}</p>
            </div>
            <div className='delete-btn-container'>
                <button className='delete-btn' onClick={deleteItem}>X</button>
            </div>
        </li> 
        
       
    )
}


export default SingleTransaction
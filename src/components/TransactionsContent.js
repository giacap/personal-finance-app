import React, {useContext, useEffect, useState} from 'react'
import { TransactionsContext } from './TransactionsContext'
import {SortedTrContext} from './SortedTrContext'
import SingleTransaction from './SingleTransaction'
import { DatesContext } from './DatesContext'


function TransactionsContent(){

    const [transactions, setTransactions] = useContext(TransactionsContext)
    const [sortedTr, setSortedTr] = useContext(SortedTrContext)


    const [typeFilter, setTypeFilter] = useState('income')
    const [filteredByType, setFilteredByType] = useState([])


    
    const [monthFilter, setMonthFilter] = useState('')
    const [filteredByMonth, setFilteredByMonth] = useState([])

   
    const [scrollPos, setScrollPos] = useState(0)
    const [scrollPos2, setScrollPos2] = useState(0)
    const [scrollPos3, setScrollPos3] = useState(0)
    


    const [dates, setDates] = useContext(DatesContext)

    

    useEffect(function(){
        const data = localStorage.getItem('transactions')
        if(data){
            setTransactions(JSON.parse(data))
        }
    }, [])
    useEffect(function(){
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    useEffect(function(){
        const data = localStorage.getItem('sortedTr')
        if(data){
            setSortedTr(JSON.parse(data))
        }
    }, [])
    useEffect(function(){
        localStorage.setItem('sortedTr', JSON.stringify(sortedTr))
    }, [sortedTr])


    useEffect(function(){
        const data = localStorage.getItem('dates')
        if(data){
            setDates(JSON.parse(data))
        }
    }, [])
    useEffect(function(){
        localStorage.setItem('dates', JSON.stringify(dates))
    }, [dates])

    
    
    




  

    




    useEffect(function(){
        let month = localStorage.getItem('month')
        if(month){
            setMonthFilter(month)
        } else {

            let cor = ''
            if(new Date().getMonth() < 9){
                cor = '0'
            }

            let todaysDate = `${new Date().getFullYear()}-${cor}${new Date().getMonth() + 1}-${new Date().getDate()}`
            setMonthFilter(todaysDate)
            
        }

        
    }, [])

    

    useEffect(function(){
        let type = localStorage.getItem('type')
        if(type){
            setTypeFilter(type)
        }
    }, [])



    useEffect(function(){
        let pos = localStorage.getItem('pos')
        if(pos){
            let position = parseFloat(pos)
            setScrollPos(position)
        }
    }, [])

    useEffect(function(){
        let pos = localStorage.getItem('pos2')
        if(pos){
            let position = parseFloat(pos)
            setScrollPos2(position)
        }
    }, [])

    useEffect(function(){
        let pos = localStorage.getItem('pos3')
        if(pos){
            let position = parseFloat(pos)
            setScrollPos3(position)
        }
    }, [])




    useEffect(function(){
        document.querySelector('.transactions-list').scrollTop = scrollPos;
    }, [scrollPos])

    useEffect(function(){
        document.querySelector('.list2').scrollTop = scrollPos2;
    }, [scrollPos2, filteredByType])

   
    useEffect(function(){
        document.querySelector('.list3').scrollTop = scrollPos3;
    }, [scrollPos3, filteredByMonth])

    

    





    {/* filter by type (income/expense) */}
    

    useEffect(function(){
        let y = sortedTr.filter(function(item){
            return item.type === typeFilter
        })

        setFilteredByType(y)
        
    }, [sortedTr, typeFilter])


    function changeFilterByType(e){
        setTypeFilter(e.target.value)
        localStorage.setItem('type', e.target.value)
    }

   







    
    {/* filter by month */}
    useEffect(function(){
        let x = sortedTr.filter(function(item){
            if(item.date.slice(0, 7) == monthFilter.slice(0, 7)){
                return item;
            }
        })
        setFilteredByMonth(x)
    }, [sortedTr, monthFilter])


    function changeMonthFilter(e){
        setMonthFilter(e.target.value)
        localStorage.setItem('month', e.target.value)
    }



    
    

    {/* keep scroll position on transactions list */}
    function scrollFunc(){
        localStorage.setItem('pos', document.querySelector('.transactions-list').scrollTop)
    }

    
    function scrollFunc2(){
        localStorage.setItem('pos2', document.querySelector('.list2').scrollTop)
    }

    

    function scrollFunc3(){
        localStorage.setItem('pos3', document.querySelector('.list3').scrollTop)
    }
   

   







    return (

        <div className='content-container transactions-content-container'>
                
            <div className='content-inner-container'>
                
                
                
                    <h2>YOUR TRANSACTIONS</h2>
                
                
                
                

                
                    <ul className='transactions-list' onScroll={scrollFunc}>
                        
                        
                        {sortedTr.length > 0 ? 
                            sortedTr.map(function(item, index){
                                return <SingleTransaction 
                                            key={item.id} 
                                            element={item} 
                                            index={index}
                                            description={item.description}
                                            category={item.category}
                                            type={item.type}
                                            amount={item.amount}
                                            date={item.date}
                                            />
                            })
                        : (
                            <p className='blank-text'>you have no transactions.</p>
                        )}



                    </ul>
                
                    
               
            </div>
            <div className='content-inner-container2'>
                <div className='right-inner'>
                    <select name="select-type" id="select-type" onChange={changeFilterByType} value={typeFilter} >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>


                    <ul className='fil-transactions-list list2' onScroll={scrollFunc2}>
                        
                        
                        {filteredByType.length > 0 ? 
                            filteredByType.map(function(item, index){
                                return <SingleTransaction 
                                            key={item.id} 
                                            element={item} 
                                            index={index}
                                            description={item.description}
                                            category={item.category}
                                            type={item.type}
                                            amount={item.amount}
                                            date={item.date}
                                            />
                            })
                        : (
                            <p className='blank-text'>you have no {typeFilter} transactions.</p>
                        )}



                    </ul>





                </div>
                <div className='right-inner'>
                    <div className='input'>
                        <label htmlFor="">Filter by Month:</label>
                        <input type="date" onChange={changeMonthFilter} value={monthFilter}/> 
                    </div>
                    
                    
                    <ul className='fil-transactions-list list3' onScroll={scrollFunc3}>
                        
                        
                        {filteredByMonth.length > 0 ? 
                            filteredByMonth.map(function(item, index){
                                return <SingleTransaction 
                                            key={item.id} 
                                            element={item} 
                                            index={index}
                                            description={item.description}
                                            category={item.category}
                                            type={item.type}
                                            amount={item.amount}
                                            date={item.date}
                                            />
                            })
                        : (
                            <p className='blank-text'>you have no transactions for the selected month.</p>
                        )}



                    </ul>




                </div>
            </div>
        </div>
    )
}



export default TransactionsContent
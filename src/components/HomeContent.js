import React, { useContext, useEffect, useState } from 'react'
import { TransactionsContext } from './TransactionsContext'
import {SortedTrContext} from './SortedTrContext'
import { CategoriesContext } from './CategoriesContext'
import { ExpenseCatContext } from './ExpenseCatContext'
import { DatesContext } from './DatesContext'


function HomeContent(){

    
    
   
    


    

    const [balance, setBalance] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)

    const [transactions, setTransactions] = useContext(TransactionsContext)
    const [sortedTr, setSortedTr] = useContext(SortedTrContext)


    const [typeInput, setTypeInput] = useState('income')
    const [dateInput, setDateInput] = useState('')
    const [categoryInput, setCategoryInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [amountInput, setAmountInput] = useState(0)
    

    
    const [categories, setCategories] = useContext(CategoriesContext)
    const [expenseCat, setExpenseCat] = useContext(ExpenseCatContext)

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
        const data = localStorage.getItem('categories')
        if(data){
            setCategories(JSON.parse(data))
        }
    }, [])
    
    
    useEffect(function(){
        localStorage.setItem('categories', JSON.stringify(categories))
    }, [categories])


    useEffect(function(){
        const data = localStorage.getItem('expenseCat')
        if(data){
            setExpenseCat(JSON.parse(data))
        }
    }, [])
    
    
    useEffect(function(){
        localStorage.setItem('expenseCat', JSON.stringify(expenseCat))
    }, [expenseCat])















    useEffect(function(){
        let cor = ''
        if(new Date().getMonth() < 9){
            cor = '0'
        }

        let todaysDate = `${new Date().getFullYear()}-${cor}${new Date().getMonth() + 1}-${new Date().getDate()}`
        setDateInput(todaysDate)
    }, [])

    

    useEffect(function(){
    
        
        let y = transactions;

        let income = 0;
        let expense = 0;

        y.forEach(function(item){
            if(item.type === 'income') {
                income = income + item.amount;
            } else if (item.type === 'expense') {
                expense = expense - item.amount;
            }
        })

 
        setTotalIncome(income)
        setTotalExpense(expense)

        let x = y.sort(function(a, b){
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateB - dateA;
        })

        setSortedTr(x)

    }, [transactions])





   







    

    useEffect(function(){
        setBalance(totalIncome - totalExpense)


    }, [totalExpense, totalIncome])




    // get inputs
    function getType(e){
        setTypeInput(e.target.value)
    }

    function getDate(e){
        setDateInput(e.target.value)
    }

    function getDescriptionInput(e){
        setDescriptionInput(e.target.value)
    }



    function getCategoryInput(e){
        setCategoryInput(e.target.value)
    }



    function getAmount(e){
        setAmountInput(e.target.value)
    }


    function getInputs(e){
        e.preventDefault()

        console.log(amountInput)
        if(amountInput != 0){
            if(typeInput === 'income'){
                setTransactions([...transactions, 
                    {
                        type: typeInput,    
                        date: dateInput,
                        description: descriptionInput,
                        category : categoryInput,
                        amount: parseFloat(amountInput),
                        id: Math.random() * 1000,
                    }])
                } else {
                    setTransactions([...transactions, 
                        {
                            type: typeInput,    
                            date: dateInput,
                            description: descriptionInput,
                            category : categoryInput,
                            amount: parseFloat(0 - amountInput),
                            id: Math.random() * 1000,
                        }])
                }
    
                
                
    
            if(typeInput == 'income'){
                let isAlready = false;
                categories.forEach(function(category){
                    if(category.nome == categoryInput){
                        isAlready = true;
                        console.log('trovato doppione')
                    }
                })
    
                if(isAlready == false){
                    setCategories([...categories, {
                        nome: categoryInput,
                        value: 0,
                    }])
                }
            } else {
                let isAlready = false;
                expenseCat.forEach(function(category){
                    if(category.nome == categoryInput){
                        isAlready = true;
                        console.log('trovato doppione')
                    }
                })
                
    
                if(isAlready == false){
                    setExpenseCat([...expenseCat, {
                        nome: categoryInput,
                        value: 0,
                    }])
                }
            }
    
    
            
            let indicator = false;
    
            console.log(dates)
            let arr = dates;
            arr.forEach(function(item, index){
                if(item.nome == dateInput){
                    indicator = true;
                    item.value = item.value + parseFloat(amountInput);
                    console.log('doppionetto')
                    setDates(arr)
                }
            })
    
            if(indicator == false){
                console.log('non doppionetto')
                setDates([...dates, {
                    nome: dateInput,
                    value: parseFloat(amountInput),
                }])
            }
    
    
            
            
            setDescriptionInput('')
            setCategoryInput('')
            setAmountInput(0)

            document.querySelector('.budget').innerHTML = 'ADD TRANSACTION'

        } else {
            document.querySelector('.budget').innerHTML = 'Insert valid amount'
        }
        

    }


    useEffect(function(){
        console.log(dates)
    }, [dates])

    

    
    









    
    useEffect(function(){
        console.log(categories)
        console.log(expenseCat)
    }, [categories, expenseCat])
    
    


    useEffect(function(){
        console.log(dates)
    }, [dates])


    return (

        <div className='content-container'>
            
            <div className='card'>
                
                <div className='budget-container'>
                    <div>
                        <h3 className='budget-title'>YOUR BALANCE is</h3>
                        <p className='budget-amount'>€ {balance}</p> 
                    </div>
                </div>





                <div className='details-container'>
                    <div className='details-container-income'>
                        <h3>TOT INCOME</h3>
                        <p>€ {totalIncome}</p>
                    </div>
                    <div className='details-container-expense'>
                        <h3>TOT EXPENSE</h3>
                        <p>€ {totalExpense}</p>
                    </div>
                </div>




                <form className='addTransaction-container' onSubmit={getInputs}>
                    <h3 className='budget'>ADD TRANSACTION</h3>
                    <div className='inner-container1'>
                        <div className='select-container' onChange={getType}>
                            <select name="" id="">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <input type="text" placeholder='insert category' onChange={getCategoryInput} value={categoryInput}/>
                        </div>
                    </div>

                    <div className='inner-container2'>
                        <div>
                            <input type='date' onChange={getDate} value={dateInput}/> 
                        </div>
                       <div className='input-container'>
                           <input type="text" placeholder='insert description' onChange={getDescriptionInput} value={descriptionInput}/>
                       </div>
                    </div>


                    <div className='inner-container3'>
                        <div>
                            <label htmlFor="">Amount:</label>
                            <input type="number" className='amount-input' onChange={getAmount} min='0' step='any' value={amountInput}/>
                        </div>
                        <div className='btn-container'>
                            <button className='add-btn'>ADD</button>
                        </div>
                    </div>
                </form>



                
            </div>

        </div>
    )
}



export default HomeContent
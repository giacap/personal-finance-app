import React, { useContext, useEffect, useState } from 'react'
import {SortedTrContext} from './SortedTrContext'
import {Line, Pie} from 'react-chartjs-2'
import { CategoriesContext } from './CategoriesContext'
import { ExpenseCatContext } from './ExpenseCatContext'
import { DatesContext } from './DatesContext'


function ReportsContent(){


    const [sortedTr, setSortedTr] = useContext(SortedTrContext)
    
   
    
    const [latesResults, setLatestResults] = useState([])

    
    const [categories, setCategories] = useContext(CategoriesContext)
    const [catNames, setcatNames] = useState([])
    const [catValue, setCatValue] = useState([])


    const [expenseCat, setExpenseCat] = useContext(ExpenseCatContext)
    const [expenseCatNames, setExpenseCatNames] = useState([])
    const [expenseCatValue, setExpenseCatValue] = useState([])


    const [dates, setDates] = useContext(DatesContext)


    const [listaDates, setListaDates] = useState([])
    const [listaValues, setListaValues] = useState([])


    
    
    
    
    useEffect(function(){
        const data = localStorage.getItem('sortedTr')
        if(data){
            setSortedTr(JSON.parse(data))
        }
    }, [dates])
    useEffect(function(){
        const data = localStorage.getItem('dates')
        if(data){
            setDates(JSON.parse(data))
        }
    }, [])


    {/* per categoria */}
    useEffect(function(){
        const data = localStorage.getItem('sortedTr')
        if(data){
            setSortedTr(JSON.parse(data))
        }
    }, [categories])

    useEffect(function(){
        const data = localStorage.getItem('categories')
        if(data){
            setCategories(JSON.parse(data))
        }
    }, [])

    useEffect(function(){
        const data = localStorage.getItem('sortedTr')
        if(data){
            setSortedTr(JSON.parse(data))
        }
    }, [expenseCat])

    useEffect(function(){
        const data = localStorage.getItem('expenseCat')
        if(data){
            setExpenseCat(JSON.parse(data))
        }
    }, [])


    

    






    



    useEffect(function(){
       
         

        let y = sortedTr;


        let oldest = [];
        let latest = [];

        y.forEach(function(item, index){
            if(index < 15){
                latest.push(item)
            } else {
                oldest.push(item)
            }
        })

      
        if(latest.length > 0 && oldest.length > 0){

            let initValue = 0;
            oldest.forEach(function(item){
                initValue = initValue + item.amount
            })
            console.log(initValue)


            let prova = dates.filter(function(item){
                return item.value !== 0;
            })

            let arr = prova;
            arr.forEach(function(item){
                item.value = 0
            })

            

            let t = arr;
            latest.forEach(function(item){
                t.forEach(function(elemento, index){
                    if(item.date == elemento.nome){
                        elemento.value = elemento.value + item.amount
                    }
                })
            })

            let x = t.sort(function(a, b){
                let dateA = new Date(a.nome);
                let dateB = new Date(b.nome);
                return dateB - dateA;
            })


           


            let z = x.map(function(item){
                return item.nome;
            })

            
            
            setListaDates(z.reverse())


           
           
            let res = initValue;
            let val = [];
            let xx = x.reverse()
            xx.forEach(function(item){
                res = res + item.value
                val.push(res)
            })

            
            setListaValues(val)

            


        } else {
            
            if(latest.length > 0){
                
                console.log(dates)
                
                let arr = dates
                let prova = arr.filter(function(item){
                    return item.value !== 0;
                })
                
                console.log(prova)
                console.log('ciaooooo')

                prova.forEach(function(item){
                    item.value = 0
                })

                console.log(prova)

                

                let t = prova;
                latest.forEach(function(item){
                    t.forEach(function(elemento, index){
                        if(item.date == elemento.nome){
                            elemento.value = elemento.value + item.amount
                        }
                    })
                })

                let x = t.sort(function(a, b){
                    let dateA = new Date(a.nome);
                    let dateB = new Date(b.nome);
                    return dateB - dateA;
                })


               


                let z = x.map(function(item){
                    return item.nome;
                })

                
                
                setListaDates(z.reverse())


               
               
                let res = 0;
                let val = [];
                let xx = x.reverse()
                xx.forEach(function(item){
                    res = res + item.value
                    val.push(res)
                })
    
                
                setListaValues(val)

                
            }
        }
                
       
        
        
    }, [sortedTr])
    {/* sortedtr, dates */}


    useEffect(function(){
        console.log(dates)
    }, [dates])




    








    {/* ottieni transazioni per categoria  */}
    useEffect(function(){
        let y = sortedTr;

        

        categories.forEach(function(item, index){
            categories[index].value = 0
            y.forEach(function(elemento, index2){
                if(elemento.type == 'income'){
                    if(item.nome == elemento.category){
                        categories[index].value = categories[index].value + elemento.amount;
                    } 
                }
            })
        })


        
        

        
        
        
        let arr = []
        categories.forEach(function(item){
            if(item.value < 0 || item.value > 0){
                arr.push(item)
            }
        })
            

        
        




        let z = []
        arr.forEach(function(item){
            z.push(item.nome)
        })

        
        





        let t = []
        arr.forEach(function(item){
            t.push(item.value)
        })

        
        

        
        
        
        setCatValue(t)
        setcatNames(z)


    }, [sortedTr])
    {/* sortedTr, categories */}
   
 



    










    useEffect(function(){
        let y = sortedTr;


        expenseCat.forEach(function(item, index){
            expenseCat[index].value = 0
            y.forEach(function(elemento, index2){
                if(elemento.type == 'expense'){
                    if(item.nome == elemento.category){
                        expenseCat[index].value = expenseCat[index].value + elemento.amount;
                    } 
                }
            })
        })



        

        let arr = []
        expenseCat.forEach(function(item){
            if(item.value < 0 || item.value > 0){
                arr.push(item)
            }
        })
            

        



        let z = []
        arr.forEach(function(item){
            z.push(item.nome)
        })

        


        let t = []
        arr.forEach(function(item){
            t.push(item.value)
        })


        setExpenseCatNames(z)
        setExpenseCatValue(t)


        

    }, [sortedTr])
    {/* sortedTr, expenseCat */}








    return (

        <div className='content-container'>
            

            <div className='reports-inner-container'>

                <div className='line-graph-container'>
                    
                    
                    <Line 
                        data={{
                            labels: listaDates,
                            datasets: [
                            {
                                label: 'Balance Result',
                                data: listaValues,
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 2
                            },
                        ],
                        }}
                        height={400}
                        options={{
                            maintainAspectRatio : false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            legend: {
                                labels: {
                                    fontColor: 'black'
                                }
                            }
                        }}
                    />
                    

                </div>


                <div className='pie-graphs-container'>
                    
                   <div className='pie-graph1'>
                    <Pie 
                            data={{
                                labels: catNames,
                                datasets: [
                                {
                                    label: 'Total Income',
                                    data: catValue,
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'green',
                                    borderWidth: 2,
                                },
                            ],
                            }}
                            height={400}
                            options={{
                                maintainAspectRatio : false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    labels: {
                                        fontColor: 'black'
                                    }
                                }
                            }}
                        />
                   </div>



                    <div className='pie-graph2'>
                            <Pie 
                                data={{
                                    labels: expenseCatNames,
                                    datasets: [
                                    {
                                        label: 'Total Expense',
                                        data: expenseCatValue,
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 2
                                    },
                                ],
                                }}
                                height={400}
                                options={{
                                    maintainAspectRatio : false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    },
                                    legend: {
                                        labels: {
                                            fontColor: 'black'
                                        }
                                    }
                                }}
                            />
                    </div>
                    


                </div>

            </div>


            
        </div>
    )
}



export default ReportsContent
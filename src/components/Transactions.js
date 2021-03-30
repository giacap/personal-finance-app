import React from 'react'
import Sidebar from './Sidebar'
import TransactionsContent from './TransactionsContent'



function Transactions(){

    return (

        <div className='section-container'>

          <Sidebar />

          <TransactionsContent />

        </div>
    )
}



export default Transactions
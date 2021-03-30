import React from 'react'
import {Link} from 'react-router-dom'


function Sidebar(){

    return(

        <div className='sidebar-container'>
            
            <Link to='/' className='sidebar-link-container'>
                <p>Home</p>
            </Link>

            <Link to='/transactions' className='sidebar-link-container'>
                <p>Transactions</p>
            </Link>

            <Link to='/reports' className='sidebar-link-container'>
                <p>Reports</p>
            </Link>


        </div>
    )
}



export default Sidebar
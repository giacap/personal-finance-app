import React from 'react'
import {Link} from 'react-router-dom'

function Header(){

    return(

        <div className='header'>

            
                <Link to='/' className='heading-container'>
                    <p className='heading'>Finance App</p>
                </Link>
                
           
            
        </div>
    )
}



export default Header
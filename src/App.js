import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Homepage from './components/Homepage'
import Transactions from './components/Transactions'
import React from './components/Reports'
import Reports from './components/Reports';
import {TransactionsProvider} from './components/TransactionsContext'
import { useState, useEffect, useContext } from 'react';
import { SortedTrProvider } from './components/SortedTrContext';
import { CategoriesProvider } from './components/CategoriesContext';
import { ExpenseCatProvider } from './components/ExpenseCatContext';
import { DatesProvider} from './components/DatesContext'



function App() {

  
  

  







  return (

    <TransactionsProvider>
      <SortedTrProvider>
        <CategoriesProvider>
          <ExpenseCatProvider>
            <DatesProvider>
            <Router>
              <div className="app">


                <Header />


                <Route path='/' exact component={Homepage}/>


                <Route path='/transactions' component={Transactions}/>

                <Route path='/reports' component={Reports}/>


              </div>
            </Router>
            </DatesProvider>
          </ExpenseCatProvider>
        </CategoriesProvider>
      </SortedTrProvider>
    </TransactionsProvider>
    
  );
}

export default App;

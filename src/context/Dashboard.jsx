import React, { useContext } from 'react';
import { contextEmail } from './Home';
import ListItems from './ListItems';

function Dashboard() 
{
    var activeUser=useContext(contextEmail);                     //useContext hook takes the context obj and uses the val of state provided by value prop of Provider Comp
  return (
    <div>
        <h1>DashBoard</h1>
        <h2>Welcome:{activeUser}</h2>
        <ListItems/>
    </div>
  )
}

export default Dashboard;
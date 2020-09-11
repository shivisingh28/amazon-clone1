import React ,{ useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Payment from './Payment';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders';

const promise = loadStripe('pk_test_51HPw3rEPfe1rPtmgjVKt7rXXs5Y3D6ucpvziAB1uh9dLPE2f61ghbCEGa0k8tgXrQG2pu6dn6WB2eDzvAvKyGoDh00PGT8rA3U');
function App() {
  const [{},dispatch] = useStateValue();
    useEffect(() => {
      
      //will only  run once when the app component loads .....
      //const unsubscribe= auth.onAuthStateChanged(authUser =>{
        auth.onAuthStateChanged((authUser) => {
        console.log('THE USER IS >>>',authUser);
        if(authUser){
          //the user just logged in / the user was logged in
          dispatch({
            type:'SET_USER',
            user: authUser,
          });
        }else{
          //the user is logged out
          dispatch({
            type:'SET_USER',
            user:null
          });
        }
      });
    },[]);
//console.log("User is >>>>",user);
  return (
    //BEM
    <Router>
      <div className="app">
       
        <Switch>
        <Route path="/orders">
        <Header />
           <Orders />
          </Route>
        <Route path="/login">
           <Login/>
          </Route>
          <Route path="/checkout">
          <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
           
          </Route>
          <Route path="/">
          <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
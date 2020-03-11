import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';


import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAdnSignUpPage from './pages/sign-up-and-sign-in/sign-up-and-sign-in.component';
import Header from './components/header/header.component';

import { connect } from 'react-redux';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from './redux/cart/cart.actions';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component{
    render() {
      return ( 
        <div className = "App">
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact 
              path='/signin' 
              render={()=> this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignInAdnSignUpPage/>
                  )
                } 
            />
          </Switch>
        </div>);
    }
}

const mapStateToProps =  createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
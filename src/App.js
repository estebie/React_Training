import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';


import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAdnSignUpPage from './pages/sign-up-and-sign-in/sign-up-and-sign-in.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component{

    unsubscribeFromAuth = null;
   
    componentDidMount(){
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //this.setState({currentUser:user});
        //createUserProfileDocument(user);
        if (userAuth){
          const userRef =  await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.props.setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          });
        }
 
        this.props.setCurrentUser(userAuth);
      });
    }
    componentWillUnmount(){
      this.unsubscribeFromAuth();
    }
    render() {
      return ( 
        <div className = "App">
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
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

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
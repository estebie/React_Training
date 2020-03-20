import React from 'react';

import {ReactComponent as Logo} from '../../assets/crown.svg';

import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropwdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer, OptionsContainer, OptionLink, LogoContainer } from './header.styles';
import {signOutStart} from '../../redux/user/user.actions';

const Header = ({currentUser, hidden, signOutStart}) =>(
    
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink className='option' to='/contact'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStart}>
                    SIGN OUT
                </OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden? null: <CartDropdown/>
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);
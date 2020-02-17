import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_aUebfPf4J9RobwuJLUZavgFS';
    const onToken = token => {
        console.log(token);
        alert('Payment Sucessful!');
    }
    return (
        <StripeCheckout 
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddresss
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
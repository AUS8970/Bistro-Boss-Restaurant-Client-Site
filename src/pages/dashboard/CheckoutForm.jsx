import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

  const { user } = useAuth();

  const [ error, setError ] = useState('');
  const [ clientSecret, setClientSecret ] = useState('');
  const [ transactionId, setTransactionId ] = useState('');

  const axiosSecure = useAxiosSecure();
  const [ cart, refetch ] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if(totalPrice > 0){
      axiosSecure.post('/create-payment-intent', {price: totalPrice})
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted');
    if (!stripe || !elements) {
      return;
    };

    const card = elements.getElement(CardElement);

    if(card === null){
      return;
    };

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');
    }

    // confirm payment
    const {paymentIntent, error : confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        }
      }
    })

    if(confirmError){
      console.log('caonfirm error')
    } else {
      console.log('payment intent', paymentIntent)

      // update the cart
      if(paymentIntent.status === 'succeeded'){
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id)
      }

      const payment = {
        email: user?.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(), // use moment.js
        cartIds: cart.map(item => item._id),
        menuItemIds: cart.map(item => item.menuId),
        status: 'pending',
      }

      const res = await axiosSecure.post('/payments', payment)
      console.log('payment', res.data)

      refetch();

      if(res.data?.paymentResult?.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for your payment",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/dashboard/paymentHistory')
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-primary bg-black m-5" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600"> {error} </p>
        { transactionId && <p className="text-green-600"> Your Transaction ID: {transactionId} </p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
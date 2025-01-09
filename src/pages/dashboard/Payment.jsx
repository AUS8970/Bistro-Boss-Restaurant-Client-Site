import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

const Payment = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase text-center"> Payment </h2>
      <div className="">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
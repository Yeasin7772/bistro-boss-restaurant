import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import useAxios from '../../../hooks/useAxios';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxios()
    const { cart, refetch } = useCart()
    const navigate = useNavigate()
    const totalPrice = cart.reduce((total, item) => total + item?.price, 0)


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);

                })
        }

    }, [totalPrice, axiosSecure])


    const handelSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(' Payment error', error);
            setError(error.message)
        } else {
            console.log('Payment Method', paymentMethod);
            setError('')
        }

        // confirm payment 

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        } else {
            console.log('payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the payment history in the database 

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    data: new Date(),
                    cartIds: cart?.map(item => item?._id),
                    menuItemIds: cart?.map(item => item?.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payment', payment)
                console.log('payment save', res);
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Thank you payment successfully",
                        icon: "success"
                    });
                    navigate('/dashboard/paymentHistory')
                }
            }
        }
    };
    return (
        <form onSubmit={handelSubmit}>
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
            <button className='btn btn-sm btn-primary my-4'
                type="submit" disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            <p className="text-red-600 ">{error}</p>
            {transactionId &&
                <p className="text-green-600">
                    Your transaction Id : {transactionId}
                </p>
            }
        </form>
    );
};

export default CheckoutForm;
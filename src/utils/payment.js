import Stripe from "stripe";

export const paymentFunction = async ({payment_method_types=['card'],
mode='payment',
customer_email='',
metadata={},
success_url,
cancel_url,
discounts=[],
line_items=[],}) => {
    const stripe = new Stripe(process.env)
    const paymentData = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        customer_email,
        metadata,
        success_url,
        cancel_url,
        discounts,
        line_items,
    })
    return paymentData
}
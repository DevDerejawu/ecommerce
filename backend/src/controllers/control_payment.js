import Stripe from "stripe";
const stripe = new Stripe(process.env?.STRIPE_PRIVATE_SECRET_KEY);

export default async function handleMakingPayment(req, res){
    try{
      const {priceAmount} = req.body;
      console.log("priceAmount", priceAmount);

  if(!priceAmount || priceAmount < 100){
    res.status(400).json({
      success: false,
      message: "Invalid amount"
    })
    return;
  }


  console.log("priceAmount", priceAmount);

  const paymentIntents = await stripe.paymentIntents.create({
    amount: priceAmount,
    currency: "usd",
    payment_method_types: ["card"]
  })

console.log("priceAmount", priceAmount);
res.status(200).json({
  success: true,
  clientSecret: paymentIntents.client_secret
})
    }catch(err){
      console.error(err);
    }

}


import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

async function makePayment(data: any): Promise<any> {
  const stripe = await loadStripe(process.env.STRIPE_PUBLISABLE_KEY!);
  axios.defaults.withCredentials = true;
  console.log(process.env.BACKEND_URL);
  const payment = await axios.post(
    `${process.env.BACKEND_URL}/api/v1/payment/sessions`,
    {
      price: data.price,
    }
  );

  const session = payment.data;
console.log("sessions id",session.data.id)
  const result = await stripe?.redirectToCheckout({
    sessionId: session.data.id,
  });
  if (result?.error) {
    console.log(result.error);
  }
}

export default makePayment;

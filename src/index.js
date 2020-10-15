import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

toast.configure();

function App() {
  const [product] = React.useState({
    name: "Zucchipakoda",
    price: 10,
    description: "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:8080/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    toast("Success! Check email for details", { type: "success" });
    
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>Buy·${product.price}</h3>
        <h4>{product.description}</h4>
      </div>
      <StripeCheckout
        stripeKey="pk_test_51HcReSCCywR5jn9OLaCupCzBftJhGrOFZ45MPralP6ff3JMwJUc0vK8feXOzXJjTRDUX1arZOhrxM7aNz1SMxWGH00RXnqiEPD"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name = {product.name}
        description = {product.description}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React, { useState } from "react";
import { useCart } from "../CartContext.js";
import { Container, Table, Button, Form } from "react-bootstrap";

const Order = () => {
  const { cart, removeFromCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const parsePrice = (price) =>
    parseFloat(price.replace("€", "").trim()) || 0;

  const calculateTotal = (item) =>
    (item.quantity * parsePrice(item.price)).toFixed(2);

  const grandTotal = cart
    .reduce((acc, item) => acc + parseFloat(calculateTotal(item)), 0)
    .toFixed(2);

  // Form state for card details (optional, for demo)
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Paypal email (optional)
  const [paypalEmail, setPaypalEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let paymentDetails = "";

    if (paymentMethod === "card") {
      paymentDetails = `Card Number: ${cardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}`;
    } else if (paymentMethod === "paypal") {
      paymentDetails = `PayPal Email: ${paypalEmail}`;
    } else {
      paymentDetails = "Cash on Delivery selected";
    }

    alert(
      `Payment method: ${paymentMethod}\n${paymentDetails}\nTotal amount: ${grandTotal}€\nThank you for your order!`
    );
  };

  return (
    <Container
      style={{ backgroundColor: "#fff8f0", color: "#5a2a27", fontFamily: "'Poppins', sans-serif" }}
      className="py-5"
    >
      <header className="text-center mb-5">
        <h1
          style={{
            fontWeight: "900",
            fontSize: "3rem",
            color: "transparent",
            background: "linear-gradient(90deg, #d1495b, #a8323e)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Order Online
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#7f4a45", fontWeight: "500" }}>
          Review your cart and select payment method
        </p>
      </header>

      {cart.length === 0 ? (
        <p className="text-center mt-4" style={{ fontSize: "1.2rem" }}>
          Your cart is empty.
        </p>
      ) : (
        <div className="d-flex flex-column flex-md-row gap-4">
          {/* Cart Table */}
          <div style={{ flex: 1 }}>
            <Table responsive bordered hover className="shadow-sm">
              <thead className="table-danger">
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Instructions</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ name, quantity, price, instructions }, idx) => (
                  <tr key={`${name}-${idx}`}>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>{price}</td>
                    <td>{instructions || "None"}</td>
                    <td>{calculateTotal({ quantity, price })}€</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        aria-label={`Remove ${name} from cart`}
                        onClick={() => removeFromCart(name, price)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-end fw-bold">
                    Grand Total:
                  </td>
                  <td colSpan={2} className="fw-bold">
                    {grandTotal}€
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Payment Options */}
          <div
            style={{
              flexBasis: "350px",
              padding: "20px",
              borderRadius: "15px",
              boxShadow:
                "15px 15px 30px rgba(209, 73, 91, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.7)",
              backgroundColor: "white",
              color: "#5a2a27",
            }}
          >
            <h3
              style={{
                color: "#a8323e",
                fontWeight: "800",
                marginBottom: "1.5rem",
                borderBottom: "2px solid #a8323e",
                paddingBottom: "5px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Payment Options
            </h3>

            <Form onSubmit={handleSubmit}>
              <Form.Check
                type="radio"
                id="card"
                label="Credit/Debit Card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-3"
              />
              {paymentMethod === "card" && (
                <>
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      maxLength={19}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="expiry">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                      maxLength={5}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                      maxLength={4}
                    />
                  </Form.Group>
                </>
              )}

              <Form.Check
                type="radio"
                id="paypal"
                label="PayPal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-3"
              />
              {paymentMethod === "paypal" && (
                <Form.Group className="mb-3" controlId="paypalEmail">
                  <Form.Label>PayPal Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Form.Check
                type="radio"
                id="cash"
                label="Cash on Delivery"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-4"
              />
              {paymentMethod === "cash" && (
                <p style={{ fontStyle: "italic", color: "#7f4a45" }}>
                  Please have the exact amount ready upon delivery.
                </p>
              )}

              <Button
                variant="danger"
                size="lg"
                type="submit"
                aria-label="Proceed to checkout"
                disabled={cart.length === 0}
                style={{ width: "100%" }}
              >
                Proceed to Checkout
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Order;

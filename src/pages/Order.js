import React, { useState } from "react";
import { useCart } from "../CartContext.js";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [paypalEmail, setPaypalEmail] = useState("");

  // Price parser
  const parsePrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("€", "").trim()) || 0;
    } else if (typeof price === "number") {
      return price;
    } else {
      return 0;
    }
  };

  // Calculate total per item
  const calculateTotal = (item) =>
    (item.quantity * parsePrice(item.price)).toFixed(2);

  // Grand total of cart
  const grandTotal = cart
    .reduce((acc, item) => acc + parseFloat(calculateTotal(item)), 0)
    .toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentDetails =
      paymentMethod === "paypal"
        ? `${t("orderPage.paypalEmail")}: ${paypalEmail}`
        : t("orderPage.cashOnDelivery");

    alert(
      `${t("orderPage.paymentOptions")}: ${paymentMethod}\n${paymentDetails}\n${t(
        "orderPage.grandTotal"
      )} ${grandTotal}€\n${t("orderPage.thankYouMessage", "Thank you for your order!")}`
    );
  };

  return (
    <Container
      style={{
        background: "#fff8f0",
        color: "#5a2a27",
        fontFamily: "'Poppins', sans-serif",
        padding: "60px 20px",
        borderRadius: "10px",
      }}
    >
      <header className="text-center mb-5">
        <h1
          style={{
            fontWeight: "900",
            fontSize: "3rem",
            color: "transparent",
            background: "linear-gradient(90deg, #c0392b, #e74c3c)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {t("orderPage.title")}
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#7f4a45", fontWeight: "500" }}>
          {t("orderPage.cartReview")}
        </p>
      </header>

      {cart.length === 0 ? (
        <p className="text-center mt-4" style={{ fontSize: "1.2rem" }}>
          {t("orderPage.cartEmpty", "Your cart is empty.")}
        </p>
      ) : (
        <div className="d-flex flex-column flex-md-row gap-4">
          {/* Cart Table */}
          <div style={{ flex: 1 }}>
            <Table responsive bordered hover className="shadow-sm">
              <thead style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                <tr>
                  <th>{t("orderPage.tableHeaders.item")}</th>
                  <th>{t("orderPage.tableHeaders.quantity")}</th>
                  <th>{t("orderPage.tableHeaders.price")}</th>
                  <th>{t("orderPage.tableHeaders.instructions")}</th>
                  <th>{t("orderPage.tableHeaders.total")}</th>
                  <th>{t("orderPage.tableHeaders.remove")}</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ name, quantity, price, instructions }, idx) => (
                  <tr key={`${name}-${idx}`}>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>{price}</td>
                    <td>{instructions || t("orderPage.none", "None")}</td>
                    <td>{calculateTotal({ quantity, price })}€</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(name, price)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-end fw-bold">
                    {t("orderPage.grandTotal")}
                  </td>
                  <td colSpan={2} className="fw-bold">
                    {grandTotal}€
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Payment Section */}
          <div
            style={{
              flexBasis: "350px",
              background: "#ffffff",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(220, 53, 69, 0.2)",
            }}
          >
            <h3
              style={{
                color: "#dc3545",
                fontWeight: "800",
                marginBottom: "1.5rem",
                borderBottom: "2px solid #dc3545",
                paddingBottom: "5px",
                textTransform: "uppercase",
              }}
            >
              {t("orderPage.paymentOptions")}
            </h3>

            <Form onSubmit={handleSubmit}>
              {/* PayPal Option */}
              <Form.Check
                type="radio"
                id="paypal"
                label={t("orderPage.paypal")}
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-3"
              />
              {paymentMethod === "paypal" && (
                <Form.Group className="mb-4" controlId="paypalEmail">
                  <Form.Label>{t("orderPage.paypalEmail")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("orderPage.emailPlaceholder")}
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {/* Cash Option */}
              <Form.Check
                type="radio"
                id="cash"
                label={t("orderPage.cashOnDelivery")}
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-3"
              />
              {paymentMethod === "cash" && (
                <div
                  style={{
                    backgroundColor: "#f9e5e5",
                    padding: "10px",
                    borderRadius: "8px",
                    fontStyle: "italic",
                    color: "#a94442",
                    marginBottom: "1rem",
                  }}
                >
                  {t(
                    "orderPage.cashInstructions",
                    "Please have the exact amount ready upon delivery."
                  )}
                </div>
              )}

              <Button
                type="submit"
                variant="danger"
                size="lg"
                style={{ width: "100%", fontWeight: "bold" }}
              >
                {t("orderPage.proceedCheckout", "Proceed to Checkout")}
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Order;

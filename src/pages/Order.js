import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Form,
  Toast,
  ToastContainer,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Order = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const location = useLocation();

  // Customer info states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [tip, setTip] = useState("");
  
  // Discount code state
  const [discountCode, setDiscountCode] = useState(null);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const DISCOUNT_PERCENTAGE = 20;

  // Toast notification states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showToastOkButton, setShowToastOkButton] = useState(false);

  // Location-related states
  const [locationLoading, setLocationLoading] = useState(true);
  const [withinDeliveryRadius, setWithinDeliveryRadius] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Restaurant's fixed coordinates
  const restaurantLocation = { lat: 52.5314, lng: 13.3898 };
  const maxDeliveryRadius = 7; // 7km max delivery radius
  const MINIMUM_ORDER = 20; // Minimum order amount

  // Fetch discount code from URL query params and store in localStorage
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const codeFromUrl = queryParams.get("discount");
    if (codeFromUrl) {
      localStorage.setItem("discountCode", codeFromUrl);
      setDiscountCode(codeFromUrl);
      setIsDiscountValid(true);
    } else {
      const storedCode = localStorage.getItem("discountCode");
      if (storedCode) {
        setDiscountCode(storedCode);
        setIsDiscountValid(true);
      }
    }
  }, [location.search]);

  // Fetch user's location using Geolocation API
  useEffect(() => {
    setLocationLoading(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distance = calculateDistance(
            latitude,
            longitude,
            restaurantLocation.lat,
            restaurantLocation.lng
          );

          if (distance <= maxDeliveryRadius) {
            setWithinDeliveryRadius(true);
          } else {
            setWithinDeliveryRadius(false);
            setLocationError(
              t("orderPage.outOfRadius", "Sorry, humari delivery sirf 7 km ke radius mein available hai.")
            );
          }
          setLocationLoading(false);
        },
        (error) => {
          setLocationError(
            t("orderPage.locationError", "Please enable location to place an order.")
          );
          setWithinDeliveryRadius(false);
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError(
        t("orderPage.locationError", "Please enable location to place an order.")
      );
      setWithinDeliveryRadius(false);
      setLocationLoading(false);
    }
  }, [t]);

  // Scroll to top on toast
  useEffect(() => {
    if (showToast) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showToast]);

  // Haversine formula to calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Helper to parse price string to number
  const parsePrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("€", "").trim()) || 0;
    } else if (typeof price === "number") {
      return price;
    }
    return 0;
  };

  // Calculate total price for one item
  const calculateTotal = (item) =>
    (item.quantity * parsePrice(item.price)).toFixed(2);

  // Calculate grand total for cart (excluding tip)
  const grandTotal = cart
    .reduce((acc, item) => acc + parseFloat(calculateTotal(item)), 0)
    .toFixed(2);

  // Calculate final total including tip and discount
  const rawTotal = parseFloat(grandTotal) + (parseFloat(tip) || 0);
  const discountAmount = isDiscountValid ? (rawTotal * DISCOUNT_PERCENTAGE) / 100 : 0;
  const finalTotal = (rawTotal - discountAmount).toFixed(2);

  // Handle order form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (cart.length === 0) {
      setToastMessage(t("orderPage.cartEmpty", "Your cart is empty."));
      setToastVariant("danger");
      setShowToast(true);
      setShowToastOkButton(true);
      return;
    }
    if (parseFloat(grandTotal) < MINIMUM_ORDER) {
      setToastMessage(
        t("orderPage.minimumOrder", `Minimum order amount is €${MINIMUM_ORDER}.`)
      );
      setToastVariant("danger");
      setShowToast(true);
      setShowToastOkButton(true);
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setToastMessage(t("orderPage.fillAllFields", "Please fill all required fields."));
      setToastVariant("danger");
      setShowToast(true);
      setShowToastOkButton(true);
      return;
    }
    if (paymentMethod === "paypal" && !paypalEmail.trim()) {
      setToastMessage(t("orderPage.paypalEmailRequired", "Please provide your PayPal email."));
      setToastVariant("danger");
      setShowToast(true);
      setShowToastOkButton(true);
      return;
    }
    if (tip && parseFloat(tip) < 0) {
      setToastMessage(t("orderPage.invalidTip", "Tip amount cannot be negative."));
      setToastVariant("danger");
      setShowToast(true);
      setShowToastOkButton(true);
      return;
    }
    if (!withinDeliveryRadius) {
      setToastMessage(
        t("orderPage.outOfRadius", "Sorry, humari delivery sirf 7 km ke radius mein available hai.")
      );
      setToastVariant("danger");
      setShowToast(true);
      setShowToastOkButton(true);
      return;
    }

    const formattedItems = cart.map((item) => ({
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      instructions: item.instructions || "",
    }));

    const orderData = {
      name,
      email,
      phone,
      address,
      items: formattedItems,
      total_price: parseFloat(finalTotal),
      payment_method: paymentMethod,
      payment_details: paymentMethod === "paypal" ? "paid" : "pending",
      tip: parseFloat(tip) || 0,
      discount_code: isDiscountValid ? discountCode : null,
      discount_percentage: isDiscountValid ? DISCOUNT_PERCENTAGE : 0,
    };

    if (paymentMethod === "cash") {
      try {
        const response = await axios.post("https://api.chelanyrestaurant-berlin.de/api/orders", orderData);
        // Clear discount code from localStorage on successful order
        if (isDiscountValid) {
          localStorage.removeItem("discountCode");
          setDiscountCode(null);
          setIsDiscountValid(false);
        }

        setToastMessage(t("orderPage.successMessage", "Order placed successfully!"));
        setToastVariant("success");
        setShowToast(true);
        setShowToastOkButton(true);

        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPaypalEmail("");
        setPaymentMethod("paypal");
        setTip("");
      } catch (error) {
        console.error(error.response?.data);
        setToastMessage(t("orderPage.errorMessage", "There was a problem placing your order. Please try again."));
        setToastVariant("danger");
        setShowToast(true);
        setShowToastOkButton(true);
      }
    }
  };

  // Toast OK button handler
  const handleToastOk = () => {
    setShowToast(false);
    setShowToastOkButton(false);
  };

  return (
    <Container
      fluid
      className="p-3 p-md-5 order-container"
      style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#4a2a27" }}
    >
      {/* Title */}
      <h1 className="order-title text-center mb-3 mb-md-4 fw-bold" style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>
        {t("orderPage.title")}
      </h1>
      <p className="order-subtitle text-center mb-2 mb-md-3" style={{ fontSize: "clamp(0.9rem, 3vw, 1.1rem)" }}>
        {t("orderPage.cartReview")}
      </p>
      <p className="text-center text-muted mb-4 mb-md-5" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
        {t("orderPage.minimumOrder", `Minimum order amount is €${MINIMUM_ORDER}.`)}
      </p>

      {/* Display location loading spinner */}
      {locationLoading && (
        <div className="text-center mb-3 mb-md-4">
          <Spinner animation="border" variant="danger" />
          <p style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
            {t("orderPage.checkingLocation", "Checking your location...")}
          </p>
        </div>
      )}

      {/* Display location error if any */}
      {locationError && !locationLoading && (
        <p className="text-center text-danger" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
          {locationError}
        </p>
      )}

      {cart.length === 0 ? (
        <p className="text-center fs-5 fst-italic text-muted" style={{ fontSize: "clamp(1rem, 3.5vw, 1.2rem)" }}>
          {t("orderPage.cartEmpty", "Your cart is empty.")}
        </p>
      ) : (
        <Row className="g-3 g-md-4 justify-content-center">
          {/* Cart Table */}
          <Col xs={12} lg={7}>
            <Card className="shadow-sm border-0 rounded-3 p-2 p-md-3 cart-card">
              <Card.Body>
                <Table responsive hover className="align-middle mb-0 table-elegant">
                  <thead>
                    <tr>
                      <th style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{t("orderPage.tableHeaders.item")}</th>
                      <th style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{t("orderPage.tableHeaders.quantity")}</th>
                      <th style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{t("orderPage.tableHeaders.price")}</th>
                      <th style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{t("orderPage.tableHeaders.instructions")}</th>
                      <th style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{t("orderPage.tableHeaders.total")}</th>
                      <th style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{t("orderPage.tableHeaders.remove")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(({ name, quantity, price, instructions }, idx) => (
                      <tr key={`${name}-${idx}`}>
                        <td className="fw-semibold" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{name}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(name, price, quantity - 1)}
                            disabled={quantity <= 1}
                            className="me-1 me-md-2"
                          >
                            -
                          </Button>
                          <span className="mx-1 mx-md-2" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(name, price, quantity + 1)}
                            className="ms-1 ms-md-2"
                          >
                            +
                          </Button>
                        </td>
                        <td style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>{price}</td>
                        <td className="text-muted fst-italic" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                          {instructions || t("orderPage.none", "None")}
                        </td>
                        <td className="fw-bold text-danger" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                          {calculateTotal({ quantity, price })}€
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(name, price)}
                            title={t("orderPage.removeItem", "Remove item")}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4" className="text-end fw-semibold" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
                        {t("orderPage.subtotal")}
                      </td>
                      <td className="fw-bold text-danger" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>{grandTotal}€</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan="4" className="text-end fw-semibold" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
                        {t("orderPage.tip")}
                      </td>
                      <td className="fw-bold text-danger" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
                        {(parseFloat(tip) || 0).toFixed(2)}€
                      </td>
                      <td></td>
                    </tr>
                    {isDiscountValid && (
                      <tr>
                        <td colSpan="4" className="text-end fw-semibold text-success" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
                          {t("orderPage.discount")}
                        </td>
                        <td className="fw-bold text-success" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>-€{discountAmount.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="4" className="text-end fw-semibold" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
                        {t("orderPage.finalTotal")}
                      </td>
                      <td className="fw-bold text-danger" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>{finalTotal}€</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Form */}
          <Col xs={12} lg={5}>
            <Card className="shadow rounded-3 p-3 p-md-4 form-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* Name */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                      {t("orderPage.form.name")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("orderPage.form.namePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                      {t("orderPage.form.email")}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("orderPage.form.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                      {t("orderPage.form.phone")}
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder={t("orderPage.form.phonePlaceholder")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                  </Form.Group>

                  {/* Address */}
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                      {t("orderPage.form.address")}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder={t("orderPage.form.addressPlaceholder")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                  </Form.Group>

                  {/* Tip Input Field */}
                  <Form.Group className="mb-3" controlId="formTip">
                    <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                      {t("orderPage.form.tip")}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={t("orderPage.form.tipPlaceholder", "Enter tip amount (optional)")}
                      value={tip}
                      onChange={(e) => setTip(e.target.value)}
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                  </Form.Group>

                  {/* Payment Method */}
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                      {t("orderPage.form.paymentMethod")}
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      label="PayPal"
                      name="paymentMethod"
                      id="paypalMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="mb-2"
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                    <Form.Check
                      type="radio"
                      label="Cash on Delivery"
                      name="paymentMethod"
                      id="cashMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                    />
                  </Form.Group>

                  {/* PayPal Email */}
                  {paymentMethod === "paypal" && (
                    <Form.Group className="mb-3" controlId="formPaypalEmail">
                      <Form.Label style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                        {t("orderPage.form.paypalEmail")}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={t("orderPage.form.paypalEmailPlaceholder")}
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        required={paymentMethod === "paypal"}
                        style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                      />
                    </Form.Group>
                  )}

                  {/* PayPal Buttons */}
                  {paymentMethod === "paypal" && withinDeliveryRadius && !locationLoading && (
                    <PayPalScriptProvider
                      options={{
                        "client-id": "AX7spZgthFeyQhErpRyL-axSAe18D0sVRVR3qhVRE1h9omZXjqdvKjUgeIG8UW36h-T_mbZhzSWx7W2Z",
                        "currency": "EUR",
                        "intent": "capture",
                        "data-env": "live"
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "EUR",
                                  value: finalTotal.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          const details = await actions.order.capture();

                          try {
                            const response = await axios.post("https://api.chelanyrestaurant-berlin.de/api/create-payment", {
                              amount: parseFloat(finalTotal),
                              orderID: details.id,
                              payerID: details.payer.payer_id,
                              paymentDetails: details,
                              name,
                              email,
                              phone,
                              address,
                              items: cart.map((item) => ({
                                quantity: item.quantity,
                                name: item.name,
                                price: item.price,
                              })),
                              total_price: parseFloat(finalTotal),
                              payment_method: "paypal",
                              tip: parseFloat(tip) || 0,
                              discount_code: isDiscountValid ? discountCode : null,
                              discount_percentage: isDiscountValid ? DISCOUNT_PERCENTAGE : 0,
                            });

                            if (response.data.success) {
                              const formattedItems = cart.map((item) => ({
                                id: item.id,
                                quantity: item.quantity,
                                name: item.name,
                                price: item.price,
                                instructions: item.instructions || "",
                              }));

                              const orderData = {
                                name,
                                email,
                                phone,
                                address,
                                items: formattedItems,
                                total_price: parseFloat(finalTotal),
                                payment_method: "paypal",
                                payment_details: "paid",
                                tip: parseFloat(tip) || 0,
                                discount_code: isDiscountValid ? discountCode : null,
                                discount_percentage: isDiscountValid ? DISCOUNT_PERCENTAGE : 0,
                              };

                              try {
                                const saveResponse = await axios.post(
                                  "https://api.chelanyrestaurant-berlin.de/api/orders",
                                  orderData
                                );

                                // Clear discount code from localStorage
                                if (isDiscountValid) {
                                  localStorage.removeItem("discountCode");
                                  setDiscountCode(null);
                                  setIsDiscountValid(false);
                                }

                                setToastMessage(t("orderPage.successMessage", "Order placed successfully!Estimated delivery: 40 minutes"));
                                setToastVariant("success");
                                setShowToast(true);
                                setShowToastOkButton(true);

                                // Reset form
                                setName("");
                                setEmail("");
                                setPhone("");
                                setAddress("");
                                setPaypalEmail("");
                                setTip("");
                              } catch (error) {
                                console.error("Error saving order:", error);
                                setToastMessage(t("orderPage.errorMessage", "Error saving order to database."));
                                setToastVariant("danger");
                                setShowToast(true);
                                setShowToastOkButton(true);
                              }
                            } else {
                              setToastMessage(t("orderPage.paymentVerificationFailed", "Payment verification failed. Please contact support."));
                              setToastVariant("danger");
                              setShowToast(true);
                              setShowToastOkButton(true);
                            }
                          } catch (error) {
                            console.error("Backend error:", error);
                            setToastMessage(t("orderPage.errorMessage", "Error completing order. Please try again."));
                            setToastVariant("danger");
                            setShowToast(true);
                            setShowToastOkButton(true);
                          }
                        }}
                        onError={(err) => {
                          console.error(err);
                          setToastMessage(t("orderPage.paymentFailed", "Payment failed, please try again."));
                          setToastVariant("danger");
                          setShowToast(true);
                          setShowToastOkButton(true);
                        }}
                      />
                    </PayPalScriptProvider>
                  )}

                  {/* Place Order button */}
                  {withinDeliveryRadius && !locationLoading && (
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mt-3"
                      style={{
                        borderRadius: "30px",
                        padding: "8px 24px",
                        backgroundColor: "#dc3545",
                        border: "none",
                        fontSize: "clamp(0.9rem, 3vw, 1rem)"
                      }}
                    >
                      {t("orderPage.placeOrder")}
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Toast Notification */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          bg={toastVariant}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide={!showToastOkButton}
          className="rounded-3 shadow"
        >
          <Toast.Body className="text-white" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
            {toastMessage}
          </Toast.Body>
          {showToastOkButton && (
            <div className="text-center my-2">
              <Button 
                variant="light" 
                onClick={handleToastOk}
                style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
              >
                OK
              </Button>
            </div>
          )}
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Order;
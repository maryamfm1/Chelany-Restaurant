import React, { useState } from "react";
import menuData from "../data/menuData.js";
import { Modal, Button, Toast, ToastContainer, Form } from "react-bootstrap";
import { useCart } from "../CartContext.js";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [instructions, setInstructions] = useState("");

  const handleQuantityChange = (itemName, value) => {
    setQuantities((prev) => ({
      ...prev,
      [itemName]: { ...prev[itemName], quantity: value > 0 ? value : 1 },
    }));
  };

  const handleAddToCart = (item) => {
    setCurrentItem(item);
    setShowInstructionsModal(true);
  };

  const handleConfirmAddToCart = () => {
    const quantity = quantities[currentItem.name]?.quantity || 1;
    const price = quantities[currentItem.name]?.selectedPrice || (Array.isArray(currentItem.price) ? currentItem.price[0] : currentItem.price);
    addToCart({ ...currentItem, price }, quantity, instructions);
    setToastMessage(`${currentItem.name} x${quantity} added to cart!`);
    setShowToast(true);
    setShowInstructionsModal(false);
    setInstructions("");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/menu.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container py-5 bg-white bg-opacity-75 rounded">
        <div className="d-flex mb-4 border-bottom pb-2 overflow-auto">
          {menuData.map(({ category }) => (
            <button
              key={category}
              className={`btn btn-link me-3 fw-bold ${
                activeCategory === category
                  ? "text-danger border-bottom border-2 border-danger"
                  : "text-dark"
              }`}
              onClick={() => setActiveCategory(category)}
              style={{ whiteSpace: "nowrap" }}
            >
              {category}
            </button>
          ))}
        </div>
        {menuData
          .filter(({ category }) => category === activeCategory)
          .map(({ category, items }) => (
            <section key={category}>
              <h2 className="mb-4">{category}</h2>
              <div className="row">
                {items.map(({ name, desc, price, img }) => (
                  <div key={name} className="col-md-6 mb-4">
                    <div className="border p-3 rounded shadow-sm h-100 d-flex justify-content-between align-items-start">
                      <div style={{ maxWidth: "60%" }}>
                        <h5 className="mb-1">{name}</h5>
                        <p
                          className="mb-1 text-muted"
                          style={{ fontSize: "0.9rem", lineHeight: "1.3" }}
                        >
                          {desc}
                        </p>
                        <div className="text-danger fw-semibold">
                          {Array.isArray(price) ? (
                            <select
                              id={`priceSelect-${name.replace(/\s+/g, '')}`}
                              name={`priceSelect-${name.replace(/\s+/g, '')}`}
                              className="form-select form-select-sm"
                              onChange={(e) =>
                                setQuantities((prev) => ({
                                  ...prev,
                                  [name]: { ...prev[name], selectedPrice: e.target.value },
                                }))
                              }
                              aria-label={`Select price for ${name}`}
                            >
                              {price.map((p, i) => (
                                <option key={i} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div>{price}</div>
                          )}
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="fw-bold"
                            onClick={() =>
                              handleQuantityChange(
                                name,
                                (quantities[name]?.quantity || 1) - 1
                              )
                            }
                            aria-label={`Decrease quantity of ${name}`}
                          >
                            -
                          </Button>
                          <span className="mx-2 text-dark fw-bold" aria-live="polite" aria-atomic="true">
                            {quantities[name]?.quantity || 1}
                          </span>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="fw-bold"
                            onClick={() =>
                              handleQuantityChange(
                                name,
                                (quantities[name]?.quantity || 1) + 1
                              )
                            }
                            aria-label={`Increase quantity of ${name}`}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-2 fw-bold"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
                          onClick={() => handleAddToCart({ name, desc, price, img })}
                          aria-label={`Add ${name} to cart`}
                        >
                          Add to Cart
                        </Button>
                      </div>
                      {img && (
                        <img
                          src={img}
                          alt={name}
                          onClick={() => setZoomedImg(img)}
                          style={{
                            height: "60px",
                            width: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            marginLeft: "15px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        <Modal show={!!zoomedImg} onHide={() => setZoomedImg(null)} centered>
          <Modal.Body className="p-0">
            <img src={zoomedImg} alt="Zoomed" className="img-fluid w-100" />
          </Modal.Body>
        </Modal>

        {/* Instructions Modal */}
        <Modal show={showInstructionsModal} onHide={() => setShowInstructionsModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Special Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="instructionsTextarea">
              <Form.Label>
                Add any special instructions for {currentItem?.name}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="e.g., No onions, extra spicy"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowInstructionsModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmAddToCart}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toast for Feedback */}
        <ToastContainer position="top-end" className="p-3">
          <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Cart Updated</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
};

export default Menu;

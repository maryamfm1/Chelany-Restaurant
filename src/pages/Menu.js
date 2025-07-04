import React, { useState, useEffect } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import { useCart } from "../CartContext.js";

const Menu = () => {
  const [language, setLanguage] = useState("en");
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [zoomedImg, setZoomedImg] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const fileToFetch = language === "en" ? "/menu.json" : "/menuDe.json";

    fetch(fileToFetch)
      .then((res) => res.json())
      .then((data) => {
        const normalizedData = data.map(({ Category, Items }) => ({
          category: Category,
          items: Items.map(({ Name, Description, "Price (€)": Price, Img }) => ({
            name: Name,
            desc: Description,
            price:
              Price === "-" || Price === "" || Price === null
                ? null
                : Array.isArray(Price)
                ? Price
                : Price,
            img: Img || null,
          })),
        }));
        setMenu(normalizedData);
        if (normalizedData.length > 0) setActiveCategory(normalizedData[0].category);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, [language]);

  const handleQuantityChange = (itemName, value) => {
    const qty = value > 0 ? value : 1;
    setQuantities((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        quantity: qty,
      },
    }));
  };

  const handleAddToCart = (item) => {
    setCurrentItem(item);
    setQuantities((prev) => ({
      ...prev,
      [item.name]: {
        quantity: prev[item.name]?.quantity || 1,
        selectedPrice: prev[item.name]?.selectedPrice || (Array.isArray(item.price) ? item.price[0] : item.price),
      },
    }));
    setShowInstructionsModal(true);
  };

  const handleConfirmAddToCart = () => {
    if (!currentItem) return;

    const quantity = quantities[currentItem.name]?.quantity || 1;
    const selectedPriceRaw = quantities[currentItem.name]?.selectedPrice || (Array.isArray(currentItem.price) ? currentItem.price[0] : currentItem.price);
    const price = selectedPriceRaw ? parseFloat(selectedPriceRaw) : null;

    addToCart({ ...currentItem, price }, quantity, instructions);

    setToastMessage(`${currentItem.name} x${quantity} added to cart!`);
    setShowToast(true);
    setShowInstructionsModal(false);
    setInstructions("");
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        backgroundImage: "url('/images/menu.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(3px)",
          zIndex: 0,
        }}
      />

      <div
        className="container py-5 bg-white bg-opacity-75 rounded"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="mb-3 d-flex justify-content-center gap-3 flex-wrap">
          <Button
            variant={language === "en" ? "danger" : "outline-danger"}
            onClick={() => setLanguage("en")}
            size="sm"
          >
            English
          </Button>
          <Button
            variant={language === "de" ? "danger" : "outline-danger"}
            onClick={() => setLanguage("de")}
            size="sm"
          >
            German
          </Button>
        </div>

        {/* Categories buttons updated here */}
        <div className="d-flex mb-4 overflow-auto" style={{ gap: "0.5rem" }}>
          {menu.map(({ category }) => (
            <button
              key={category}
              className={`btn btn-sm ${
                activeCategory === category ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              style={{
                whiteSpace: "nowrap",
                borderRadius: "0.25rem", // normal border radius, no pill
                padding: "0.25rem 0.6rem",
                fontWeight: "600",
                minWidth: "auto",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {menu
          .filter(({ category }) => category === activeCategory)
          .map(({ category, items }) => (
            <section key={category}>
              <h2 className="mb-4">{category}</h2>
              <div className="row">
                {items.map(({ name, desc, price, img }) => (
                  <div key={name} className="col-md-6 mb-4">
                    <div className="border p-3 rounded shadow-sm h-100 d-flex flex-column">
                      {img && (
                        <img
                          src={img}
                          alt={name}
                          className="mb-3 rounded"
                          style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => setZoomedImg(img)}
                        />
                      )}

                      <h5>{name}</h5>
                      <p>{desc}</p>

                      {Array.isArray(price) ? (
                        <select
                          className="form-select mb-2"
                          aria-label={`Select price for ${name}`}
                          value={
                            quantities[name]?.selectedPrice || price[0]
                          }
                          onChange={(e) =>
                            setQuantities((prev) => ({
                              ...prev,
                              [name]: {
                                ...prev[name],
                                selectedPrice: e.target.value,
                              },
                            }))
                          }
                        >
                          {price.map((p, idx) => (
                            <option key={idx} value={p}>
                              {p} €
                            </option>
                          ))}
                        </select>
                      ) : price ? (
                        <p className="fw-bold mb-2">{price} €</p>
                      ) : (
                        <p className="text-muted mb-2">Price not available</p>
                      )}

                      <div
                        className="d-flex align-items-center mb-3"
                        style={{ maxWidth: "120px", gap: "0.4rem" }}
                      >
                        <button
                          className="btn btn-danger btn-sm"
                          aria-label={`Decrease quantity for ${name}`}
                          onClick={() =>
                            handleQuantityChange(
                              name,
                              (quantities[name]?.quantity || 1) - 1
                            )
                          }
                          disabled={(quantities[name]?.quantity || 1) <= 1}
                          style={{ padding: "0.25rem 0.5rem" }}
                        >
                          −
                        </button>
                        <span
                          className="fw-bold"
                          style={{
                            minWidth: "25px",
                            textAlign: "center",
                            userSelect: "none",
                          }}
                        >
                          {quantities[name]?.quantity || 1}
                        </span>
                        <button
                          className="btn btn-danger btn-sm"
                          aria-label={`Increase quantity for ${name}`}
                          onClick={() =>
                            handleQuantityChange(
                              name,
                              (quantities[name]?.quantity || 1) + 1
                            )
                          }
                          style={{ padding: "0.25rem 0.5rem" }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart({ name, desc, price, img })}
                        aria-label={`Add ${name} to cart`}
                        className="btn btn-danger btn-sm"
                        style={{
                          padding: "0.25rem 0.5rem",
                          width: "auto",
                          minWidth: "auto",
                          alignSelf: "flex-start",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

        <Modal show={!!zoomedImg} onHide={() => setZoomedImg(null)} centered>
          <Modal.Body className="p-0">
            <img src={zoomedImg} alt="Zoomed Item" style={{ width: "100%" }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setZoomedImg(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showInstructionsModal}
          onHide={() => setShowInstructionsModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add special instructions (optional)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Write special instructions here..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowInstructionsModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmAddToCart}>
              Confirm & Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>

        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1051 }}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default Menu;

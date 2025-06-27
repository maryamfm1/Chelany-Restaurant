import React, { useState } from "react";

const Reservation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (add more if needed)
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date ||
      !form.time ||
      form.guests < 1
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Aage submit logic (API ya email etc.) yahan daalo

    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/images/re.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        color: "#fff",
        textShadow: "1.5px 1.5px 5px rgba(0,0,0,0.8)",
      }}
    >
      <div
        className="reservation-card"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "20px",
          padding: "3rem 3.5rem",
          maxWidth: "600px",
          width: "100%",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.9), inset 0 0 10px rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "2.8rem",
            fontWeight: "900",
            marginBottom: "1.8rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "linear-gradient(90deg, #d1495b, #a8323e)", // fallback nahi hota CSS mein gradient text inline :-(
            background:
              "linear-gradient(90deg, #d1495b, #a8323e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Book Your Table
        </h2>

        {submitted ? (
          <div
            style={{
              fontSize: "1.3rem",
              padding: "2rem",
              textAlign: "center",
              color: "#a0d468",
              fontWeight: "600",
              border: "2px solid #a0d468",
              borderRadius: "15px",
              boxShadow: "0 0 10px #a0d468",
            }}
          >
            Thank you, <strong>{form.name}</strong>! Your reservation is confirmed.
            <br />
            We look forward to welcoming you on <strong>{form.date}</strong> at{" "}
            <strong>{form.time}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group mb-3">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="form-control input-3d"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="form-control input-3d"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+49 123 4567890"
                required
                className="form-control input-3d"
              />
            </div>

            <div className="form-row d-flex justify-content-between mb-3 gap-3 flex-wrap">
              <div style={{ flex: "1 1 45%" }}>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="form-control input-3d"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div style={{ flex: "1 1 45%" }}>
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="form-control input-3d"
                  min="11:00"
                  max="23:00"
                />
              </div>
            </div>

            <div className="form-group mb-4" style={{ maxWidth: "150px" }}>
              <label htmlFor="guests">Guests</label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                min="1"
                max="20"
                required
                className="form-control input-3d"
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-lg btn-3d w-100"
              aria-label="Book reservation"
            >
              Book Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reservation;

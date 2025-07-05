import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // i18n hook

const Reservation = () => {
  const { t } = useTranslation(); // translation function

  // Step 1: Form state initialization
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [submitted, setSubmitted] = useState(false); // track submission status

  // Step 2: Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Step 3: Form submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date ||
      !form.time ||
      form.guests < 1
    ) {
      alert(t("reservation.error")); // translated error message
      return;
    }

    // TODO: Yahan apni API call ya email sending ka logic daalein

    setSubmitted(true); // show confirmation message
  };

  // Today date for min attribute in date input
  const today = new Date().toISOString().split("T")[0];

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
            background: "linear-gradient(90deg, #d1495b, #a8323e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("reservation.title")}
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
            {/* Confirmation message with interpolated values */}
            {t("reservation.confirmation", { name: form.name })}
            <br />
            {t("reservation.confirmationDetails", {
              date: form.date,
              time: form.time,
            })}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group mb-3">
              <label htmlFor="name">{t("reservation.form.name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("reservation.form.placeholderName")}
                required
                className="form-control input-3d"
              />
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email">{t("reservation.form.email")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("reservation.form.placeholderEmail")}
                required
                className="form-control input-3d"
              />
            </div>

            {/* Phone Number */}
            <div className="form-group mb-3">
              <label htmlFor="phone">{t("reservation.form.phone")}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("reservation.form.placeholderPhone")}
                required
                className="form-control input-3d"
              />
            </div>

            {/* Date and Time inputs */}
            <div className="form-row d-flex justify-content-between mb-3 gap-3 flex-wrap">
              <div style={{ flex: "1 1 45%" }}>
                <label htmlFor="date">{t("reservation.form.date")}</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="form-control input-3d"
                  min={today}
                />
              </div>

              <div style={{ flex: "1 1 45%" }}>
                <label htmlFor="time">{t("reservation.form.time")}</label>
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

            {/* Guests */}
            <div className="form-group mb-4" style={{ maxWidth: "150px" }}>
              <label htmlFor="guests">{t("reservation.form.guests")}</label>
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

            {/* Submit button */}
            <button
              type="submit"
              className="btn btn-danger btn-lg btn-3d w-100"
              aria-label={t("reservation.form.bookNow")}
            >
              {t("reservation.form.bookNow")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reservation;

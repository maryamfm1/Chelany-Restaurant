import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

function ReservationForm() {
  const { t } = useTranslation();

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    message: '',
  });

  // Submission and error states
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      formData.guests < 1
    ) {
      alert(t("reservation.error"));
      return;
    }

    try {
      // Prepare payload (backend expects 'guests' not 'people')
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        message: formData.message,
      };

      // Make POST request to backend API
      await axios.post(" https://api.chelanyrestaurant-berlin.de/api/reservations", payload);

      // On success
      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(t("reservation.apiError") || "Server error, try again.");
    }
  };

  // Get today's date for min attribute in date input
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
            {t("reservation.confirmation", { name: formData.name })}
            <br />
            {t("reservation.confirmationDetails", {
              date: formData.date,
              time: formData.time,
            })}
          </div>
        ) : (
          <>
            {error && (
              <div
                style={{
                  marginBottom: "1rem",
                  color: "#ff6b6b",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group mb-3">
                <label htmlFor="name">{t("reservation.form.name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("reservation.form.placeholderName")}
                  required
                  className="form-control input-3d"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">{t("reservation.form.email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("reservation.form.placeholderEmail")}
                  required
                  className="form-control input-3d"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="phone">{t("reservation.form.phone")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("reservation.form.placeholderPhone")}
                  required
                  className="form-control input-3d"
                />
              </div>

              <div className="form-row d-flex justify-content-between mb-3 gap-3 flex-wrap">
                <div style={{ flex: "1 1 45%" }}>
                  <label htmlFor="date">{t("reservation.form.date")}</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
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
  value={formData.time}
  onChange={handleChange}
  required
  className="form-control input-3d"
  min="11:00"
  max="23:00"
  step="60" // ye line add karo
/>

                </div>
              </div>

              <div className="form-group mb-4" style={{ maxWidth: "150px" }}>
                <label htmlFor="guests">{t("reservation.form.guests")}</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  required
                  className="form-control input-3d"
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="message">{t("reservation.form.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("reservation.form.placeholderMessage")}
                  className="form-control input-3d"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="btn btn-danger btn-lg btn-3d w-100"
                aria-label={t("reservation.form.bookNow")}
              >
                {t("reservation.form.bookNow")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationForm;

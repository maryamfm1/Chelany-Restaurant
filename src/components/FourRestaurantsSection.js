import React from "react";
import "./FourRestaurantsSection.css";
import { useTranslation } from "react-i18next";

const FourRestaurantsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="four-restaurants-section position-relative">
      {/* Background Dish Images */}
      <div className="four-restaurants-bg-images">
        <img
          className="four-restaurants-img-left"
          src="/images/ak.jpg"
          alt={t("fourRestaurants.altLeft", "Dish Left")}
          loading="lazy"
        />
        <img
          className="four-restaurants-img-right"
          src="/images/ka.jpg"
          alt={t("fourRestaurants.altRight", "Dishes Right")}
          loading="lazy"
        />
      </div>

      {/* Center Content */}
      <div className="container text-center position-relative content-text">
        {/* Main Heading */}
        <h2 className="mt-5 mb-3 main-heading">
          {t("fourRestaurants.titleLine1", "Chelany Restaurant")} <br />{" "}
          {t("fourRestaurants.titleLine2", "in the heart of Berlin")}
        </h2>

        {/* Sub Heading */}
        <h3 className="mb-2 text-main sub-heading">
          {t("fourRestaurants.subHeading", "Indian food of all variety")}
        </h3>

        {/* Smaller Description */}
        <p className="h5 text-main small-desc">
          {t(
            "fourRestaurants.description",
            "From candlelight dinner to large groups or events everyone is welcome at our place."
          )}
        </p>

        {/* Flower Icon */}
        <img
          src="https://amrit.de/wp-content/themes/amrit/src/dist/img/icons/flower.svg"
          width="32"
          height="31"
          alt={t("fourRestaurants.flowerAlt", "Flower Icon")}
          className="d-block mx-auto mt-5 mb-4"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default FourRestaurantsSection;

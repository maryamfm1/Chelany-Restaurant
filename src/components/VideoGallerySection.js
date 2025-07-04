import React from "react";
import "./VideoGallerySection.css";

const VideoGallerySection = () => {
  return (
    <section className="video-gallery-section container">
      {/* YouTube Video Embed */}
      <div className="video-container mb-4">
        <iframe
          src="https://www.youtube.com/embed/fIujJS9ABz8"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="gallery-image">
          <img src="/images/cry.jpg" alt="Gallery 1" loading="lazy" />
        </div>
        <div className="gallery-image">
          <img src="/images/Gulab.jpeg" alt="Gallery 2" loading="lazy" />
        </div>
        <div className="gallery-image">
          <img src="/images/drink.jpg" alt="Gallery 3" loading="lazy" />
        </div>
        <div className="gallery-image">
          <img src="/images/baar.jpg" alt="Gallery 3" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default VideoGallerySection;

import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <p>
        WhatsApp us: <span className="highlight">8780165043</span>
      </p>

      <p>
        Call us: <span className="highlight">1800 890 1222</span>
      </p>

      <p>8:00 AM to 8:00 PM, 365 days</p>

      <p className="desc">
        Should you encounter any bugs, glitches, lack of functionality,
        delayed deliveries, billing errors or other problems on the website.
      </p>
{/* 
      <div className="download-section">
        <h3>Download the app</h3>

        <div className="app-buttons">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
          />
        </div>
      </div> */}
    </div>
  );
}

export default ContactUs;

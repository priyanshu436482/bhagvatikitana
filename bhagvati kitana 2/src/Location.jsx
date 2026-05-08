import React from 'react'
import "./Location.css";

function Location() {
  return (
    <div>
       <div className="location-page">
      <div className="location-card">
        <h2 className="location-title">📍 Our Store Location</h2>

        <p className="location-address">
          23, Yoginagar, Detroj Road,<br />
          Ta: Kadi,<br />
          Dist: Mehsana, Gujarat
        </p>

        <div className="map-container">
          <iframe
            title="store-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.378761808537!2d72.32025987561907!3d23.30201257897884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c1804532dbbd9%3A0x14770ba0ad83d5cc!2sYoginagar%20Society!5e0!3m2!1sen!2sus!4v1771397344048!5m2!1sen!2sus"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  )
}


export default Location

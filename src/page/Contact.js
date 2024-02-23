import React from 'react'

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-details">
        <h2 className="contact-heading">Contact Us</h2>

        <p className="contact-info">
          <strong>Phone:</strong> (123) 456-7890
        </p>

        <p className="contact-info">
          <strong>Address:</strong> 123 Farm Lane Rd, Green Valley, MD 23900
        </p>

        <p className="contact-delivery">
          Experience the goodness of our farm-fresh harvest, and the best part? <span className="contact-delivery-free">Delivery is free to all US states!</span>
      </p>
      </div>
    </div>
  )
}

export default Contact;
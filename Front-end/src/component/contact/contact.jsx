
import React, { useState } from 'react';
import "../contact/contact.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    // Clear message after a few seconds
    setTimeout(() => {
      setSubmissionMessage('Thank you for your message! We will get back to you soon.');
    }, 2000);
    setTimeout(() => {
      setSubmissionMessage('');
    }, 5000);

  };

  return (
    // Apply classes for styling from ContactUs.css
    <div className="contact-us-container">
      <div className="contact-us-card">
        <h2 className="contact-us-title">Contact Us</h2>

        {submissionMessage && (
          <div className="submission-message" role="alert">
            <span className="submission-message-text">{submissionMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-us-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              placeholder="Subject of your message"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Your message here..."
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="submit-button"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

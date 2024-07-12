import React from 'react';
import './TryQuoraPlus.css';

const TryQuoraPlus = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}>×</button>
        <h2>Join Quora+</h2>
        <div className="modal-body">
          <div className="features">
            <div className="feature">
              <i className="fa-solid fa-check"></i> 
              Browse Quora ad-free
            </div>
            <div className="feature">
              <i className="fa-solid fa-lock"></i> 
              Unlock millions of answers
            </div>
            <div className="feature">
              <i className="fa-solid fa-dollar-sign"></i> 
              Try it free for 30 days
            </div>
          </div>
          <div className="subscription-options">
            <div className="option">
              <input type="radio" id="yearly" name="subscription" defaultChecked />
              <label htmlFor="yearly">Yearly</label>
              <span className="price">$3.99/mo <span className="discount">Save 43%</span></span>
            </div>
            <div className="option">
              <input type="radio" id="monthly" name="subscription" />
              <label htmlFor="monthly">Monthly</label>
              <span className="price">$6.99/mo</span>
            </div>
          </div>
          <div className="trial-info">
            <p>30-day free trial</p>
            <p>Starting August 12, 2024</p>
            <p>$0.00</p>
            <p>Your subscription will renew automatically each year. Cancel at any time in settings.</p>
            <p>By signing up for a subscription, you agree to Quora's <a href="#">Subscriber Terms of Service</a>.</p>
          </div>
          <button className="paypal-button"><i className="fa-brands fa-paypal"></i> PayPal</button>
          <div className="or-separator">OR</div>
          <div className="card-details">
            <input type="text" placeholder="Card number" />
            <input type="text" placeholder="MM / YY" />
            <input type="text" placeholder="CVC" />
          </div>
          <p>Existing subscriptions will also be charged to this card. You may receive a temporary authorization charge to validate your card. <a href="#">Learn more</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default TryQuoraPlus;

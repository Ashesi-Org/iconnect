import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Company Name</h3>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>&copy; {new Date().getFullYear()} Company Name</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>
              Address: 123 Street Name, City, Country
            </p>
            <p>
              Phone: +1 234 567 890
            </p>
            <p>
              Email: contact@company.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <p>
              For inquiries or assistance, reach out to our support team:
            </p>
            <p>
              Phone: +1 234 567 890
            </p>
            <p>
              Email: support@company.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";

const Footer = () => {
  const logoAnimation = useSpring({
    loop: true,
    to: [{ rotateZ: 0 }, { rotateZ: 45 }],
    from: { rotateZ: 0 },
    config: { duration: 2000 },
  });

  return (
    <footer style={footerStyle}>
      <div style={logoContainer}>
        <animated.strong style={{ ...logo, ...logoAnimation }}>Marsoul</animated.strong>
        <div style={connectContainer}>
          <div>
            Marsoul Hel:<a href="mailto:info@example.com" style={iconLink}>
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a><br/>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#4b504b', // A darker shade for a more professional look
  color: '#ffffff',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '20px', // Added padding for some spacing around the content
};

const logoContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Center items vertically for a balanced look
  width: '100%', // Ensure it takes the full width of the parent container
  marginBottom: '20px',
};

const logo = {
  fontSize: '32px',
  fontWeight: 'lighter',
  marginLeft:'20px'
};

const connectContainer = {
  display: 'flex',
  alignItems: 'center',
};

const iconLink = {
  color: '#ffffff',
  margin: '0 15px',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

iconLink[':hover'] = {
  color: '#ffc107', // Change color on hover for better UX
};

export default Footer;

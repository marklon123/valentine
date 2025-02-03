import { useEffect, useState, useRef } from 'react';
import './App.css';
import emailjs from "@emailjs/browser";

function App() {
  const [showModal, setShowModal] = useState(false);
  const modal = useRef(null);
  const exit = useRef(null);
  const buttons = useRef([]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (exit.current === e.target || 
        (!modal.current.contains(e.target) && !buttons.current.includes(e.target))) {
      setShowModal(false);
    }
  };

  const templateParams = {
    message: "I said yesss",
    to_email: "marklon567@gmail.com",
  };

  useEffect(() => {
    const sendEmail = async (e) => {
      try {
        const response = await emailjs.send(
          "service_do9tm49",
          "template_097gbcl",
          templateParams,
          "rYrtwA-wcQC5TnRww"
        );
      } catch (err) {
        console.error("Failed to send message", err);
      }
    };

    // Attach click event listeners to buttons
    buttons.current.forEach((btn) => {
      btn.addEventListener("click", sendEmail);
    });

    if (showModal) {
      document.addEventListener("click", closeModal);
    } else {
      document.removeEventListener("click", closeModal);
    }

    // Clean up event listeners
    return () => {
      buttons.current.forEach((btn) => {
        btn.removeEventListener("click", sendEmail);
      });
      document.removeEventListener("click", closeModal);
    };
  }, [showModal]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          {showModal && (
            <div ref={modal} className="modal">
              <h3>Congrats on getting yourself the best valentine</h3>
              <h5>Message sent pookie😁</h5>
              <div className="exit">
                <i ref={exit} className="fa-solid fa-x"></i>
              </div>
            </div>
          )}
          <div className="willYouBe">
            <img src="/images/heart.png" alt="heart" />
            <div className="sayYes">
              <h1>Will you be my valentine</h1>
              <div className="buttonContainer">
                <button ref={(el) => (buttons.current[0] = el)} onClick={handleButtonClick}>
                  YESS
                </button>
                <h2 className="or">OR</h2>
                <button ref={(el) => (buttons.current[1] = el)} onClick={handleButtonClick}>
                  YESSSSSS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

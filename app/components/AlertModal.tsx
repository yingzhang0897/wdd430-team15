import {useEffect, useState} from "react";
import ReactDOM from "react-dom";

const AlertModal = ({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      setShowModal(true);
    } else {
      // Wait for the fade-out transition before setting showModal to false
      document.body.style.overflow = ""; // Restore scrolling
      const timeout = setTimeout(() => setShowModal(false), 300); // 300ms for fade-out duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black/50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }} // Close on background click
    >
      <div
        className="bg-white text-black rounded-lg overflow-hidden shadow-lg max-w-sm w-full opacity-100 transition-all duration-300 transform relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex justify-center w-full bg-blue-800">
          <h2 className="text-2xl font-bold text-center my-3 text-white">
            Alert
          </h2>
          <button
            className="absolute top-4 right-4 cursor-pointer text-white hover:text-gray-300 text-3xl/5"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-lg my-5 text-center">{message}</p>
          <div className="flex justify-center">
            <button
              className="px-4 py-1 bg-blue-800 text-white rounded-md hover:bg-blue-900"
              onClick={onClose}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default AlertModal;

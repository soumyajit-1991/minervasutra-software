//pages/Help&Support.jsx
import { useOutletContext } from "react-router-dom";

export default function HelpSupport() {
  const { darkMode } = useOutletContext();

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div>
        <h2 className="text-2xl font-bold">Help & Support</h2>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Get assistance with your pharmacy management system.
        </p>
      </div>

      <div className="space-y-4">
        <div
          className={`p-4 rounded border transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3 className="font-medium text-lg">📞 Contact Support</h3>
          <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-600 mt-2"}>
            For urgent help, call us at <strong>+1 (800) 123-4567</strong> or email
            <a
              href="mailto:support@phermo.com"
              className={darkMode ? "text-blue-400 ml-1" : "text-blue-600 ml-1"}
            >
              support@phermo.com
            </a>.
          </p>
        </div>

        <div
          className={`p-4 rounded border transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3 className="font-medium text-lg">❓ Frequently Asked Questions (FAQ)</h3>
          <ul
            className={`list-disc list-inside mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <li>How do I add a new customer?</li>
            <li>How can I view sales reports?</li>
            <li>How do I reset my password?</li>
            <li>How do I manage suppliers?</li>
          </ul>
        </div>

        <div
          className={`p-4 rounded border transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3 className="font-medium text-lg">📝 Feedback</h3>
          <textarea
            className={`w-full p-2 border rounded transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            rows="4"
            placeholder="Share your feedback or issue here..."
          ></textarea>
          <button
            className={`mt-3 px-4 py-2 rounded transition ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
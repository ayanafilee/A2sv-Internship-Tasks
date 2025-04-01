// src/components/ErrorMessage.jsx
const ErrorMessage = ({ message }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto mt-8">
    <h3 className="text-red-800 font-semibold">⚠️ Error Loading Data</h3>
    <p className="text-red-700 mt-2">{message}</p>
    <p className="text-red-600 text-sm mt-2">
      Please try refreshing the page or contact support if the problem persists.
    </p>
  </div>
);

export default ErrorMessage;

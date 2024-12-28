
const CustomAlert = ({ message, onClose}) => {

console.log(message, onClose);

  return (
    <div className="fixed inset-x-0 top-0 flex items-center justify-center bg-opacity-50 z-[10000000]">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mt-4 mx-4">
        <p id="pdfContent" className="mt-4">
          {message}
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;



const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  console.log(isOpen,onClose,imageUrl);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-4 w-[90%] max-w-[500px]">
          <button
            className="text-gray-500 hover:text-black float-right text-lg font-bold"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex justify-center items-center mt-4">
            {imageUrl ? (
              <img
                src={"http://localhost:5000/"+imageUrl}
                alt="Modal Content"
                className="max-w-full max-h-[400px] object-contain rounded-lg"
              />
            ) : (
              <p className="text-center text-gray-500">No image available</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ImageModal
const Confirmation = ({ formData, onSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(formData, null, 2)}
      </pre>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default Confirmation;

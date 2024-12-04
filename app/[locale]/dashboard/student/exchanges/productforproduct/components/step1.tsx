const Step1 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      proposedOffer: {
        ...prev.proposedOffer,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Proposed Offer Details</h2>
      <label>
        Title of the Offer
        <input
          type="text"
          name="title"
          value={formData.proposedOffer.title}
          onChange={handleChange}
          className="block w-full border p-2 rounded mb-4"
        />
      </label>
      <label>
        Offer Type
        <select
          name="offerType"
          value={formData.proposedOffer.offerType}
          onChange={handleChange}
          className="block w-full border p-2 rounded mb-4"
        >
          <option value="">Select</option>
          <option value="good">A Good</option>
          <option value="service">A Service</option>
        </select>
      </label>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Step1;

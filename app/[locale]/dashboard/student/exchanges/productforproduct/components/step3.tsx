const Step3 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      deliveryConditions: {
        ...prev.deliveryConditions,
        [name]: newValue,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Conditions</h2>
      <label>
        Pickup Available?
        <input
          type="checkbox"
          name="pickup"
          checked={formData.deliveryConditions.pickup}
          onChange={handleChange}
          className="ml-2"
        />
      </label>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Step3;

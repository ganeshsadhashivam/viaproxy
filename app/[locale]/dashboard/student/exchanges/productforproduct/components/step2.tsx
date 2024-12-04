const Step2 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      expectedRequirements: {
        ...prev.expectedRequirements,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expected Requirements</h2>
      <label>
        Title of the Requirement
        <input
          type="text"
          name="title"
          value={formData.expectedRequirements.title}
          onChange={handleChange}
          className="block w-full border p-2 rounded mb-4"
        />
      </label>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Step2;

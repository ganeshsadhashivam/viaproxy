import React, { useState } from "react";

const SubmitExchangeForm = ({ formData, setFormData, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deliveryAddress: {
        ...prev.deliveryAddress,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (basic example)
    if (!formData.title || !formData.offerType) {
      alert("Please fill in all required fields.");
      return;
    }

    // Proceed to the next step
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-4 bg-gray-50 rounded">
      <h2 className="text-xl font-bold text-center text-green-600">
        Submit an Exchange Offer
      </h2>
      <p className="text-center">
        Finance your projects or expenses with your unused services or goods!
      </p>
      <div className="text-center">Zone 1 Insertion banner Advertising</div>
      <div className="bg-gray-100 text-center">
        <h2>Details of the proposed offer</h2>
        <h3>Detail as Precisely as possible what you offer</h3>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-medium">
          Title of the Offer
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Offer Type */}
      <div>
        <label className="block font-medium">What do you Offer?</label>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              name="offerType"
              value="A Good"
              checked={formData.offerType === "A Good"}
              onChange={handleInputChange}
            />{" "}
            A Good
          </label>
          <label>
            <input
              type="radio"
              name="offerType"
              value="A Service"
              checked={formData.offerType === "A Service"}
              onChange={handleInputChange}
            />{" "}
            A Service
          </label>
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Health">Health</option>
        </select>
      </div>

      {/* Subcategory */}
      <div>
        <label htmlFor="subcategory" className="block font-medium">
          Subcategory
        </label>
        <select
          id="subcategory"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Subcategory</option>
          <option value="Cameras">Cameras</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      {/* featured product status */}
      <div>
        <label htmlFor="featuredproductstatus">Featured Product Status</label>
        <select name="" id="featuredproductstatus">
          <option value="Nine">Nine</option>
          <option value="Almost nine">Almost nine</option>
          <option value="Very good condition">Very good condition</option>
          <option value="Good Condition">Good Condition</option>
          <option value="Used">Used</option>
          <option value="Need for repair">Need for repair</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium">
          Additional Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>
      {/* image */}
      <div>
        <p>Additional Description of your offer</p>
        <input type="file" />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block font-medium">
            Offer Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block font-medium">
            Offer End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* form of exchange */}
      <div>
        <label htmlFor="formofexchange">Form of Exchange</label>
        <select name="formofexchange" id="formofexchange">
          <option value="Sale">Sale</option>
          <option value="Gift">Gift</option>
        </select>
      </div>

      {/* Delivery */}
      {/* <div>
        <label className="block font-medium">Delivery Options</label>
        <label>
          <input
            type="checkbox"
            name="deliveryPickup"
            checked={formData.deliveryPickup}
            onChange={handleInputChange}
          />{" "}
          Pickup Available
        </label>
        {formData.deliveryPickup && (
          <div className="mt-2 space-y-2">
            <label>
              Country
              <input
                type="text"
                name="country"
                value={formData.deliveryAddress.country}
                onChange={handleAddressChange}
                className="w-full border p-2 rounded"
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                value={formData.deliveryAddress.city}
                onChange={handleAddressChange}
                className="w-full border p-2 rounded"
              />
            </label>
            <label>
              Campus
              <input
                type="text"
                name="campus"
                value={formData.deliveryAddress.campus}
                onChange={handleAddressChange}
                className="w-full border p-2 rounded"
              />
            </label>
          </div>
        )}
      </div> */}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default SubmitExchangeForm;

// export default function SubmitExchangeForm() {
//   return (
//     <div>
//       <div>
//         <h1>Submit an Exchange Offer</h1>
//         <p>
//           Finance your projects or expenses with your unused services or goods!
//         </p>
//         <div>Zone 1 Insertion banner Advertising</div>
//         <div className="bg-gray-50">
//           <h2>Details of the proposed offer</h2>
//           <h3>Detail as Precisely as possible what you offer</h3>
//         </div>
//         <div>
//           <div>
//             Title of the Offer <input type="text" />
//           </div>
//           <div>
//             what do you Offer? <input type="radio" name="AGood" id="AGood" />{" "}
//             <label htmlFor="AGood">A GOOD</label>
//             <input type="radio" name="AService" id="AService" />{" "}
//             <label htmlFor="AService">A Service</label>
//             <label htmlFor="category">Category</label>
//             <select name="category" id="category">
//               <option value="Electronics">Electronics</option>
//             </select>
//             <label htmlFor="subcategory">SubCategory</label>
//             <select name="subcategory" id="subcategory">
//               <option value="Cameras & Accessories">
//                 Camera & Accessories
//               </option>
//               <option value="Health & PersonalCare">
//                 Health & PersonalCare
//               </option>
//             </select>
//             <label htmlFor="featuredproductstatus">
//               Featured Product Status
//             </label>
//             <select name="" id="featuredproductstatus">
//               <option value="Nine">Nine</option>
//               <option value="Almost nine">Almost nine</option>
//               <option value="Very good condition">Very good condition</option>
//               <option value="Good Condition">Good Condition</option>
//               <option value="Used">Used</option>
//               <option value="Need for repair">Need for repair</option>
//             </select>
//             <div>
//               <p>Additional Description of your offer</p>
//               <input type="file" />
//             </div>
//             <div>
//               <label htmlFor="offerstartdate">Offer Start Date</label>
//               <input type="date" id="offerstartdate" />
//               <label htmlFor="offerenddate">Offer End Date</label>
//               <input type="date" id="offerenddate" />
//             </div>
//             <div>
//               <label htmlFor="formofexchange">Form of Exchange</label>
//               <select name="formofexchange" id="formofexchange">
//                 <option value="Sale">Sale</option>
//                 <option value="Gift">Gift</option>
//               </select>
//             </div>
//           </div>
//         </div>

//     </div>
//   );
// }

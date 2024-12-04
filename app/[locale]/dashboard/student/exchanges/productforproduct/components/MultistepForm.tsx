"use client";

import React, { useState } from "react";
import SubmitExchangeForm from "./SubmitExchangeForm";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    offerType: "",
    category: "",
    subcategory: "",
    description: "",
    startDate: "",
    endDate: "",
    formOfExchange: "",
    estimatedValue: "",
    depositPayment: "",
    deliveryPickup: false,
    deliveryAddress: {
      country: "",
      city: "",
      campus: "",
    },
  });

  // Handlers to navigate between steps
  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {currentStep === 1 && (
        <SubmitExchangeForm
          formData={formData} // Pass only the proposed offer data
          setFormData={(updatedData) =>
            setFormData((prev) => ({
              ...prev,
              proposedOffer: updatedData,
            }))
          }
          onNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <ExpectedRequirementForm
          formData={formData} // Pass only the expected requirements data
          setFormData={(updatedData) =>
            setFormData((prev) => ({
              ...prev,
              expectedRequirements: updatedData,
            }))
          }
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {/* {currentStep === 3 && (
        <div>
          <h2 className="text-xl font-bold">Confirm Your Details</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(formData, null, 2)}
          </pre>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}  */}
    </div>
  );
};

export default MultiStepForm;

// import React, { useState } from "react";
// import SubmitExchangeForm from "./SubmitExchangeForm";
// // import SubmitExchangeForm from "./forms/SubmitExchangeForm";
// // import ExpectedRequirementForm from "./forms/ExpectedRequirementForm";

// const MultiStepForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     proposedOffer: {},
//     expectedRequirements: {},
//   });

//   const handleNext = () => setCurrentStep((prev) => prev + 1);
//   const handleBack = () => setCurrentStep((prev) => prev - 1);

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       {currentStep === 1 && (
//         <SubmitExchangeForm
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//         />
//       )}
//       {currentStep === 2 && (
//         <ExpectedRequirementForm
//           formData={formData}
//           setFormData={setFormData}
//           onBack={handleBack}
//           onNext={handleNext}
//         />
//       )}
//       {currentStep === 3 && (
//         <div>
//           <h2 className="text-xl font-bold">Confirm Your Details</h2>
//           <pre className="bg-gray-100 p-4 rounded">
//             {JSON.stringify(formData, null, 2)}
//           </pre>
//           <button
//             onClick={() => alert("Form Submitted!")}
//             className="px-4 py-2 bg-green-500 text-white rounded mt-4"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiStepForm;

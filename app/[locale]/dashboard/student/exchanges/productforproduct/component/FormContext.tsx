"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      return savedFormData
        ? JSON.parse(savedFormData)
        : {
            proposedOffer: {
              title: "",
              offerType: "",
              category: "",
              subcategory: "",
              featuredProductStatus: "",
              additionalDescription: "",
              startDate: null,
              endDate: null,
              formOfExchange: "",
            },
            materialConditions: {
              decision: false,
              percentage: "",
              moneyBackGuarantee: false,
              satisfactionGuarantee: false,
              desiredPaymentForm: "",
              desiredPaymentType: "",
            },
            deliveryConditions: {
              pickup: false,
              pickupAddress: "",
              pickupCountry: "",
              pickupCity: "",
              pickupCampus: "",
              delivery: false,
              deliveryCost: "",
              deliveryCountry: "",
              deliveryCity: "",
            },
            expectedRequirements: {},
          };
    }
    return {};
  });

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCurrentStep = localStorage.getItem("currentStep");
      return savedCurrentStep ? parseInt(savedCurrentStep, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
  }, [formData, currentStep]);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        handleNext,
        handleBack,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

//og
// import { children, createContext, useContext, useState } from "react";

// export const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     proposedOffer: {
//       title: "",
//       offerType: "",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "",
//       additionalDescription: "",
//       startDate: null,
//       endDate: null,
//       formOfExchange: "",
//     },
//     materialConditions: {
//       decision: false, // Yes/No for Deposit Payment
//       percentage: "", // Deposit Percentage if "Yes"
//       moneyBackGuarantee: false, // Yes/No for Money Back Guarantee
//       satisfactionGuarantee: false, // Yes/No for Satisfaction Guarantee
//       desiredPaymentForm: "", // Dropdown for Desired Payment Form
//       desiredPaymentType: "", // Dropdown for Desired Payment Type
//     },
//     deliveryConditions: {
//       pickup: false, // Yes/No for Pickup
//       pickupAddress: "",
//       pickupCountry: "",
//       pickupCity: "",
//       pickupCampus: "",
//       delivery: false, // Yes/No for Delivery
//       deliveryCost: "",
//       deliveryCountry: "",
//       deliveryCity: "",
//     },
//     expectedRequirements: {
//       // Fields for expected requirements (if applicable)
//     },
//   });

//   const [currentStep, setCurrentStep] = useState(0);

//   const handleNext = () => setCurrentStep((prev) => prev + 1);
//   const handleBack = () => setCurrentStep((prev) => prev - 1);

//   return (
//     <FormContext.Provider
//       value={{
//         formData,
//         setFormData,
//         currentStep,
//         handleNext,
//         handleBack,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error("useFormContext must be used within a FormProvider");
//   }
//   return context;
// };

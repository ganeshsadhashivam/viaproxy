import { children, createContext, useContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
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
      decision: false, // Yes/No for Deposit Payment
      percentage: "", // Deposit Percentage if "Yes"
      moneyBackGuarantee: false, // Yes/No for Money Back Guarantee
      satisfactionGuarantee: false, // Yes/No for Satisfaction Guarantee
      desiredPaymentForm: "", // Dropdown for Desired Payment Form
      desiredPaymentType: "", // Dropdown for Desired Payment Type
    },
    deliveryConditions: {
      pickup: false, // Yes/No for Pickup
      pickupAddress: "",
      pickupCountry: "",
      pickupCity: "",
      pickupCampus: "",
      delivery: false, // Yes/No for Delivery
      deliveryCost: "",
      deliveryCountry: "",
      deliveryCity: "",
    },
    expectedRequirements: {
      // Fields for expected requirements (if applicable)
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

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

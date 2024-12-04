"use client";

import React from "react";
import { Steps } from "antd";
import { useFormContext } from "./component/FormContext";
import SubmitExchangeForm from "./component/SubmitExchangeForm";
import ExpectedRequirement from "./components/ExpectedRequirements";
// import Success from "./Success";

const { Step } = Steps;

const MultiStepForm = () => {
  const { currentStep } = useFormContext();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Steps Progress Bar */}
      <Steps current={currentStep - 1} className="mb-6">
        <Step title="Submit an Exchange offer" description="" />
        <Step title="Requirements" description="What do you need?" />
        <Step title="Success" description="Review and confirm" />
      </Steps>

      {/* Step Content */}
      {currentStep === 1 && <SubmitExchangeForm />}
      {currentStep === 2 && <ExpectedRequirement />}
      {/* {currentStep === 3 && <Success />}  */}
    </div>
  );
};

export default MultiStepForm;

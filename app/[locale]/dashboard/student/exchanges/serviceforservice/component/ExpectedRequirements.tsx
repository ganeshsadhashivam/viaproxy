"use client";

import React from "react";
import { Formik, Form } from "formik";
import { RadioChangeEvent } from "antd";
import { Input, Radio, Select, DatePicker } from "formik-antd";
import Image from "next/image";
// import { useFormContext } from "../component/FormContext";
import {
  setFormData,
  setCurrentStep,
} from "@/store/slices/serviceForServiceFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslations } from "next-intl";

const ExchangeDetailsForm = () => {
  const dispatch = useDispatch();
  const t = useTranslations("form");
  // const { formData, setFormData, handleNext } = useFormContext();

  const { formData, currentStep } = useSelector(
    (state: RootState) => state.serviceForServiceExchangeForm
  );

  const handleDecisionChange = (e: RadioChangeEvent) => {
    const decision = e.target.value;
    dispatch(
      setFormData({
        materialConditions: {
          ...formData.materialConditions,
          decision,
          percentage:
            decision === "no"
              ? ""
              : formData.materialConditions?.percentage || "",
        },
      })
    );
  };

  // const handleDecisionChange = (e: RadioChangeEvent) => {
  //   const decision = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     materialConditions: {
  //       ...prev.materialConditions,
  //       decision,
  //       percentage:
  //         decision === "no" ? "" : prev.materialConditions?.percentage || "",
  //     },
  //   }));
  // };

  // const handlePickupChange = (e: RadioChangeEvent) => {
  //   const pickup = e.target.value as "" | "yes" | "no"; // Explicitly cast to the expected literal type

  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryConditions: {
  //       ...prev.deliveryConditions,
  //       pickup,
  //       pickupDetails:
  //         pickup === "no" ? "" : prev.deliveryConditions.pickupDetails || "",
  //     },
  //     // Ensure expectedRequirements is included in the updated object
  //     expectedRequirements: prev.expectedRequirements,
  //   }));
  // };

  const handlePickupChange = (e: RadioChangeEvent) => {
    const pickup = e.target.value as "" | "yes" | "no";
    dispatch(
      setFormData({
        deliveryConditions: {
          ...formData.deliveryConditions,
          pickup,
          pickupDetails:
            pickup === "no"
              ? ""
              : formData.deliveryConditions.pickupDetails || "",
        },
      })
    );
  };
  // const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const pickup = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryConditions: {
  //       ...prev.deliveryConditions,
  //       pickup,
  //       pickupDetails:
  //         pickup === "no" ? {} : prev.deliveryConditions?.pickupDetails || {},
  //     },
  //   }));
  // };

  // const handleDeliveryChange = (e: RadioChangeEvent) => {
  //   const delivery = e.target.value as "" | "yes" | "no"; // Explicitly cast to the literal type

  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryConditions: {
  //       ...prev.deliveryConditions,
  //       delivery,
  //       deliveryCost:
  //         delivery === "no" ? "" : prev.deliveryConditions.deliveryCost || "",
  //     },
  //     // Preserve the existing expectedRequirements field
  //     expectedRequirements: prev.expectedRequirements,
  //   }));
  // };

  const handleDeliveryChange = (e: RadioChangeEvent) => {
    const delivery = e.target.value;
    dispatch(
      setFormData({
        deliveryConditions: {
          ...formData.deliveryConditions,
          delivery,
          deliveryCost:
            delivery === "no"
              ? ""
              : formData.deliveryConditions?.deliveryCost || "",
        },
      })
    );
  };

  const handleNext = () => dispatch(setCurrentStep(currentStep + 1));
  const handleBack = () => dispatch(setCurrentStep(currentStep - 1));

  //   const handleFreeQuoteChange = (e: RadioChangeEvent) => {
  //     const freeQuote = e.target.value;

  //     dispatch(
  //       setFormData({
  //         materialConditions: {
  //           ...formData.materialConditions,
  //           freeQuote,
  //           quoteFee: freeQuote === "yes" ? formData.materialConditions?.quoteFee || "" : "",
  //         },
  //       })
  //     );
  //   };

  const handleTravelExpensesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const travelExpenses = e.target.value as "" | "yes" | "no"; // Type assertion
    const existingQuoteFee = parseFloat(
      formData.materialConditions?.quoteFee as any
    );

    dispatch(
      setFormData({
        materialConditions: {
          ...formData.materialConditions,
          travelExpenses,
          quoteFee:
            travelExpenses === "yes" && !isNaN(existingQuoteFee)
              ? existingQuoteFee
              : null,
        },
      })
    );
  };

  const handleFreeQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const freeQuote = e.target.value as "" | "yes" | "no"; // Assert the type explicitly

    const existingQuoteFee = parseFloat(
      formData.materialConditions?.quoteFee as any
    );

    dispatch(
      setFormData({
        materialConditions: {
          ...formData.materialConditions,
          freeQuote,
          quoteFee:
            freeQuote === "yes" && !isNaN(existingQuoteFee)
              ? existingQuoteFee
              : null,
        },
      })
    );
  };

  const handleOtherPossibleCosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otherCosts = e.target.value as "" | "yes" | "no";
    const existingCostAmount = parseFloat(
      formData.materialConditions?.costAmount as any
    );

    dispatch(
      setFormData({
        materialConditions: {
          ...formData.materialConditions,
          otherCosts,
          costAmount:
            otherCosts === "yes" && !isNaN(existingCostAmount)
              ? existingCostAmount
              : null,
        },
      })
    );
  };

  const handleCostAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const costAmount = parseFloat(e.target.value) || null; // Parse the value as a number or set it to null

    dispatch(
      setFormData({
        materialConditions: {
          ...formData.materialConditions,
          costAmount,
        },
      })
    );
  };

  // const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const delivery = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryConditions: {
  //       ...prev.deliveryConditions,
  //       delivery,
  //       deliveryCost:
  //         delivery === "no" ? "" : prev.deliveryConditions?.deliveryCost || "",
  //     },
  //   }));
  // };

  // const handleDecisionChange = (e) => {
  //   const decision = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     materialConditions: {
  //       ...prev.materialConditions,
  //       decision,
  //       percentage:
  //         decision === "no" ? "" : prev.materialConditions?.percentage || "",
  //     },
  //   }));
  // };

  // const handlePickupChange = (e) => {
  //   const pickup = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryConditions: {
  //       ...prev.deliveryConditions,
  //       pickup,
  //       pickupDetails:
  //         pickup === "no" ? {} : prev.deliveryConditions?.pickupDetails || {},
  //     },
  //   }));
  // };

  // const handleDeliveryChange = (e) => {
  //   const delivery = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     deliveryConditions: {
  //       ...prev.deliveryConditions,
  //       delivery,
  //       deliveryCost:
  //         delivery === "no" ? "" : prev.deliveryConditions?.deliveryCost || "",
  //     },
  //   }));
  // };

  return (
    <Formik
      initialValues={{
        ...formData.proposedOffer,
        ...formData.materialConditions,
        ...formData.deliveryConditions,
      }}
      onSubmit={(values) => {
        const collectedData = {
          proposedOffer: {
            ...formData.proposedOffer,
            ...values,
          },
          materialConditions: {
            ...formData.materialConditions,
            ...values,
          },
          deliveryConditions: {
            ...formData.deliveryConditions,
            ...values,
          },

          expectedRequirements: {
            ...formData.deliveryConditions,
            ...values,
          },
        };
        // console.log("Collected Form Data:", collectedData);
        // setFormData(collectedData);
        // handleNext();
        console.log("Collected Form Data:", collectedData);
        dispatch(setFormData(collectedData));
        dispatch(setCurrentStep(2)); // Move to the next step
      }}
    >
      {() => (
        <Form className="space-y-6 p-4 md:p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto border border-gray-200">
          <>
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
                {t(`Details Of The Expected Requirements`)}
              </h2>
              <p className="text-gray-600">
                {t(
                  `Finance Your Projects Or Expenses With Your Unused Services Or Goods!`
                )}
              </p>
            </div>

            {/* zone 1 insertion banner Advertising */}
            <div className="text-center p-5">
              <h2 className="mb-5 text-lg font-bold">
                {t("Zone 1 Insertion Banner Advertising")}
              </h2>
              <label
                htmlFor="zone1-banner"
                className="inline-block cursor-pointer p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <Image
                  src="/imagetoselect.png" // Replace with the URL or path to your upload icon/image
                  alt="Upload Banner"
                  className="max-w-full h-auto mx-auto mb-2"
                  width={100}
                  height={100}
                />
                <p className="text-gray-600"> {t(`click_to_upload`)}</p>
              </label>
              <input
                id="zone1-banner"
                type="file"
                name="zone1 Advertising banner"
                className="hidden"
              />
            </div>

            {/* <div>
              <Input type="file" name="zone1adv" />
            </div> */}

            {/* Details of the expected need */}
            <div className="text-center bg-gray-50">
              <h4>{t(`Details Of The Expected Need`)}</h4>
              <h4>{t(`Detail Your Needs As Precisely As Possible`)}</h4>
            </div>

            {/* Title of the Offer */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Title of the Offer`)}
              </label>
              <Input
                name="title"
                placeholder="Enter title"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Offer Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`What Do You Want?`)}
              </label>
              <Radio.Group name="offerType" className="flex flex-wrap gap-4">
                <Radio name="Good" value="Good">
                  {t(`Good`)}
                </Radio>
                <Radio name="Service" value="Service">
                  {t(`Service`)}
                </Radio>
              </Radio.Group>
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`Category`)}
                </label>
                <Select
                  name="category"
                  placeholder="Select Category"
                  className="w-full"
                >
                  <Select.Option value="Electronics">
                    {t(`Electronics`)}
                  </Select.Option>
                  <Select.Option value="Health">{t(`Health`)}</Select.Option>
                </Select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`SubCategory`)}
                </label>
                <Select
                  name="subcategory"
                  placeholder="Select Subcategory"
                  className="w-full"
                >
                  <Select.Option value="Accessories">
                    {t(`Accessories`)}
                  </Select.Option>
                  <Select.Option value="Health">{t(`Health`)}</Select.Option>
                </Select>
              </div>
            </div>

            {/* Featured Product Status */}
            {/* <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Desired Product Status`)}
              </label>
              <Select
                name="featuredProductStatus"
                placeholder="Select Status"
                className="w-full"
              >
                <Select.Option value="Nine">{t(`Nine`)}</Select.Option>
                <Select.Option value="Very Good Condition">
                  {t(`Very Good Condition`)}
                </Select.Option>
                <Select.Option value="Good Conditon">
                  {t(`Good Condition`)}
                </Select.Option>
                <Select.Option value="Used">{t(`Used`)}</Select.Option>
                <Select.Option value="Need for repair">
                  {t(`Need For Repair`)}
                </Select.Option>
              </Select>
            </div> */}

            {/* Additional description of your needs */}
            {/* <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Additional description of your needs
              </label>
              <textarea
                name="additionaldescription"
                placeholder="Provide details"
                rows={4}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            {/* Additional Description of Your Offer */}
            <div className="p-1 space-y-4">
              <label
                htmlFor="additionaldescription"
                className="block text-sm font-semibold text-gray-700"
              >
                {t(`Additional Description Of Your Offer`)}
              </label>
              <Input
                type="text"
                name="additionaldescription"
                id="additionaldescription"
                placeholder="Enter additional details about your offer"
                className="w-full p-2 border rounded-md"
              />

              <div className="mt-4">
                <label
                  htmlFor="offer-images"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {t(`upload_offer_images`)}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2"
                    >
                      <label
                        htmlFor={`offer-image-${index}`}
                        className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-400 hover:bg-gray-50"
                      >
                        <Image
                          src="/imagetoselect.png" // Replace this with your actual icon path
                          alt="Select Image"
                          className="h-12 w-12"
                          width={100}
                          height={100}
                        />
                        <span className="text-sm text-gray-500">
                          {t(`Select Image`)}
                        </span>
                      </label>
                      <input
                        type="file"
                        name={`offerImage-${index}`}
                        id={`offer-image-${index}`}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* images to be selected */}
            {/* <div>
              {/* <div className="mt-4">
                <h3 className="text-lg font-bold text-center mb-4">
                  Upload Images of Desired Product
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Select up to 3 images of the product you want to upload.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> */}
            {/* Image Upload Field 1 */}
            {/* <div className="flex flex-col items-center">
                    <label
                      htmlFor="image1"
                      className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    > */}
            {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg> */}
            {/* <Image
                        src="/imagetoselect.png"
                        width={50}
                        height={50}
                        alt="image1"
                      />
                      <span className="text-gray-600 text-sm">
                        Choose Image 1
                      </span>
                    </label>
                    <Input
                      id="image1"
                      name="image1"
                      type="file"
                      className="hidden"
                    />
                  </div> */}

            {/* Image Upload Field 2 */}
            {/* <div className="flex flex-col items-center">
                    <label
                      htmlFor="image2"
                      className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src="/imagetoselect.png"
                        width={50}
                        height={50}
                        alt="image1"
                      />
                      <span className="text-gray-600 text-sm">
                        Choose Image 2
                      </span>
                    </label>
                    <Input
                      id="image2"
                      name="image2"
                      type="file"
                      className="hidden"
                    />
                  </div> */}

            {/* Image Upload Field 3 */}
            {/* <div className="flex flex-col items-center">
                    <label
                      htmlFor="image3"
                      className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src="/imagetoselect.png"
                        width={50}
                        height={50}
                        alt="image1"
                      />
                      <span className="text-gray-600 text-sm">
                        Choose Image 3
                      </span>
                    </label>
                    <Input
                      id="image3"
                      name="image3"
                      type="file"
                      className="hidden"
                    />
                  </div> */}
            {/* </div>
              </div>
              upload any images of desired product */}
            {/* </div>  */}

            {/* Offer Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`OfferStartDate`)}
                </label>
                <DatePicker name="startDate" className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`OfferEndDate`)}
                </label>
                <DatePicker name="endDate" className="w-full" />
              </div>
            </div>

            {/* Form of Exchange */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("FormOfExchange")}
              </label>
              <Select
                name="formOfExchange"
                placeholder={t("formOfExchange")}
                className="w-full"
              >
                <Select.Option value="Sale">{t("Sale")}</Select.Option>
                <Select.Option value="Gift">{t("Gift")}</Select.Option>
              </Select>
            </div>

            {/* Material condition of Expected Requirement of product for a service exchange */}
            <div>
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
                  {t(`Material conditions of the exchange`)}
                </h2>
                {/* <p className="text-gray-600">
                Provide details regarding payment and delivery conditions.
              </p> */}
              </div>

              <div className="p-2 space-y-6">
                {/* Hourly Rate, Minimum Benefit, Package Requested */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="hourlyRate"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Hourly rate
                    </label>
                    <Input
                      type="number"
                      name="hourlyRate"
                      id="hourlyRate"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="minimumBenefit"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Minimum benefit
                    </label>
                    <Input
                      type="number"
                      name="minimumBenefit"
                      id="minimumBenefit"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="packageRequested"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Package Requested
                    </label>
                    <Input
                      type="number"
                      name="packageRequested"
                      id="packageRequested"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Travel Expenses */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Travel Expenses
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="travelexpenses"
                        value="yes"
                        className="form-radio"
                        onChange={handleTravelExpensesChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="travelexpenses"
                        value="no"
                        className="form-radio"
                        onChange={handleTravelExpensesChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.materialConditions.travelExpenses === "yes" && (
                    <div className="mt-4">
                      <label
                        htmlFor="feeAmount"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Fee Amount
                      </label>
                      <Input
                        type="number"
                        name="feeAmount"
                        id="feeAmount"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  )}
                </div>

                {/* Free Quote */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Free Quote
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="freequote"
                        value="yes"
                        className="form-radio"
                        onChange={handleFreeQuoteChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="freequote"
                        value="no"
                        className="form-radio"
                        onChange={handleFreeQuoteChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.materialConditions.freeQuote === "no" && (
                    <div className="mt-4">
                      <label
                        htmlFor="amountoffees"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Fee Amount
                      </label>
                      <Input
                        type="number"
                        name="amountoffees"
                        id="amountoffees"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  )}
                </div>

                {/* Other Possible Costs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Other Possible Costs
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="otherCosts"
                        value="yes"
                        className="form-radio"
                        onChange={handleOtherPossibleCosts}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="otherCosts"
                        value="no"
                        className="form-radio"
                        onChange={handleOtherPossibleCosts}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.materialConditions.otherCosts === "yes" && (
                    <div className="mt-4">
                      <label
                        htmlFor="costAmount"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Amount of These Costs
                      </label>
                      <Input
                        type="number"
                        name="costAmount"
                        id="costAmount"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={handleCostAmountChange}
                      />
                    </div>
                  )}
                </div>

                {/* Nature of Costs */}
                <div>
                  <label
                    htmlFor="natureOfCost"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Specify the nature of these costs
                  </label>
                  <Input
                    type="text"
                    name="natureOfCost"
                    id="natureOfCost"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Contingent warranty */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Contingent Warranty Required`)}
              </label>
              <textarea
                name="contigentWarranty"
                placeholder="Provide details"
                rows={4}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t(`MoneyBackGuarantee`)}
              </label>
              <Radio.Group
                name="moneyBackGuarantee"
                className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap"
              >
                <Radio
                  name="moneyBackGuarantee"
                  value="yes"
                  className="w-full sm:w-auto text-center"
                >
                  {t(`yes`)}
                </Radio>
                <Radio
                  name="moneyBackGuarantee"
                  value="no"
                  className="w-full sm:w-auto text-center"
                >
                  {t(`no`)}
                </Radio>
              </Radio.Group>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t(`Satisfaction or Exchange Guarantee`)}
              </label>
              <Radio.Group
                name="satisfactionGuarantee"
                className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap"
              >
                <Radio
                  name="satisfactionGuarantee"
                  value="yes"
                  className="w-full sm:w-auto text-center"
                >
                  {t(`yes`)}
                </Radio>
                <Radio
                  name="satisfactionGuarantee"
                  value="no"
                  className="w-full sm:w-auto text-center"
                >
                  {t(`no`)}
                </Radio>
              </Radio.Group>
            </div>

            {/* Estimated Value */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Estimated value of the exchange`)}
              </label>
              <Input
                name="estimatedValue"
                placeholder="Enter estimated value"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Deposit Payment */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Deposit Payment for booking`)}
              </label>
              <Radio.Group
                name="decision"
                value={formData.materialConditions?.decision || ""}
                onChange={handleDecisionChange}
                className="flex flex-wrap gap-4"
              >
                <Radio name="depositpaymentyes" value="yes">
                  {t(`yes`)}
                </Radio>
                <Radio name="depositpaymentno" value="no">
                  {t(`no`)}
                </Radio>
              </Radio.Group>
              {formData.materialConditions?.decision === "yes" && (
                <div className="mt-4">
                  <label
                    htmlFor="percentage"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t(`Deposit Percentage (%)`)}:
                  </label>
                  <Input
                    id="percentage"
                    name="percentage"
                    type="number"
                    placeholder="Enter percentage"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Other Contingent Coverage */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Other Contingent Coverage Required`)}
              </label>
              <textarea
                name="otherCoverage"
                placeholder="Provide details"
                rows={4}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment and Delivery Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Payment Form */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`DesiredPaymentForm`)}
                </label>
                <Select
                  name="desiredPaymentForm"
                  placeholder="Select Payment Form"
                  className="w-full"
                >
                  <Select.Option value="exchange-sum">
                    {t(`Exchange + or - Additional Sum`)}
                  </Select.Option>
                  <Select.Option value="exchange-service">
                    {t(`Exchange + or - Benefit or Service`)}
                  </Select.Option>
                </Select>
              </div>

              {/* Payment Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`DesiredPaymentType`)}
                </label>
                <Select
                  name="desiredPaymentType"
                  placeholder="Select Payment Type"
                  className="w-full"
                >
                  <Select.Option value="hand-to-hand">
                    {t(`handToHand`)}
                  </Select.Option>
                  <Select.Option value="before-delivery">
                    {t(`Exchange & Payment Before Delivery`)}
                  </Select.Option>
                  <Select.Option value="after-delivery">
                    {t(`Exchange & Payment After Delivery`)}
                  </Select.Option>
                </Select>
              </div>
            </div>

            {/* Delivery Conditions */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-center mb-4">
                {t(`DeliveryConditions`)}
              </h2>

              {/* Pickup */}
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`Pickup`)}
                </label>
                <Radio.Group
                  name="pickup"
                  className="flex flex-wrap gap-4"
                  value={formData.deliveryConditions?.pickup || ""}
                  onChange={handlePickupChange}
                >
                  <Radio name="pickup" value="yes">
                    {t(`yes`)}
                  </Radio>
                  <Radio name="pickup" value="no">
                    {t(`no`)}
                  </Radio>
                </Radio.Group>
                {formData.deliveryConditions?.pickup === "yes" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`PickupAddress`)}
                      </label>
                      <Input name="pickupAddress" placeholder="Enter Address" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`Country`)}
                      </label>
                      <Input name="pickupCountry" placeholder="Enter Country" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`City`)}
                      </label>
                      <Input name="pickupCity" placeholder="Enter City" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`Campus`)}
                      </label>
                      <Input name="pickupCampus" placeholder="Enter Campus" />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  {t(`Delivery`)}
                </label>
                <Radio.Group
                  name="delivery"
                  className="flex flex-wrap gap-4"
                  value={formData.deliveryConditions?.delivery || ""}
                  onChange={handleDeliveryChange}
                >
                  <Radio name="delivery" value="yes">
                    {t(`yes`)}
                  </Radio>
                  <Radio name="delivery" value="no">
                    {t(`no`)}
                  </Radio>
                </Radio.Group>
                {formData.deliveryConditions?.delivery === "yes" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`DeliveryCost (€)`)}
                      </label>
                      <Input name="deliveryCost" placeholder="Enter Cost" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`Country`)}
                      </label>
                      <Input
                        name="deliveryCountry"
                        placeholder="Enter Country"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t(`City`)}
                      </label>
                      <Input name="deliveryCity" placeholder="Enter City" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* geolocation of the transaction */}
            <div className="mt-4">
              <h2 className="text-xl font-bold text-center mb-4">
                {t(`Geolocation of the transaction`)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="geoCampus"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t(`Geolocation of Campus`)}
                  </label>
                  <Input
                    id="geoCampus"
                    name="GeoLocation of campus"
                    type="text"
                    placeholder="Enter campus location"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="geoCountry"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t(`Geolocation of Country`)}
                  </label>
                  <Input
                    id="geoCountry"
                    name="GeoLocation of country"
                    type="text"
                    placeholder="Enter country location"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            {/* other special conditions */}
            {/* <div className="mt-4"> */}
            {/* <h2 className="text-xl font-bold text-center mb-4">
                Other Special Conditions
              </h2>
              <p className="text-gray-700 text-center mb-4">
                Additional description of the payment or delivery methods
              </p> */}

            {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Textarea Input 
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows={4}
                    className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* File Input 
                <div>
                  <label
                    htmlFor="fileUpload"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Upload File
                  </label>
                  <div className="flex items-center space-x-6">
                    <label
                      htmlFor="fileUpload"
                      className="flex items-center justify-center w-full p-6 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src="/documents.png" // Replace this with your file icon path
                        alt="Upload Icon"
                        width={50}
                        height={50}
                        className="mr-2"
                      />
                      <span className="text-gray-600 text-base">
                        Choose File
                      </span>
                    </label>
                    <input
                      id="fileUpload"
                      name="file"
                      type="file"
                      className="hidden"
                    />
                  </div>
                </div>
              </div> */}
            {/* </div> */}
            {/* other special conditions */}
            <div className="mt-4">
              <h2 className="text-xl font-bold text-center mb-4">
                {t("Other Special Conditions")}
              </h2>
              {/* <p className="text-gray-700 text-center mb-4">
              {t("Additional Description of the payment or Delivery Method")}
            </p> */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Textarea Input */}
                {/* <p className="text-gray-700 text-center mb-4">
                {t("Additional Description of the payment or Delivery Method")}
              </p> */}
                <div>
                  <label
                    htmlFor="AdditionalDescriptionofpaymentorDeliveryMethod"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {/* {t("Description")} */}
                    {t(
                      "Additional Description of the payment or Delivery Method"
                    )}
                  </label>
                  <textarea
                    // id="description"
                    id="AdditionalDescriptionofpaymentorDeliveryMethod"
                    name="description"
                    placeholder={t("Description")}
                    rows={4}
                    className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* File Input */}
                <div>
                  <label
                    htmlFor="fileUpload"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t("uploadFile")}
                  </label>
                  <div className="flex items-center space-x-6">
                    <label
                      htmlFor="fileUpload"
                      className="flex items-center justify-center w-full p-6 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src="/documents.png" // Replace this with your file icon path
                        alt={t("uploadIconAlt")}
                        width={50}
                        height={50}
                        className="mr-2"
                      />
                      <span className="text-gray-600 text-base">
                        {t("chooseFile")}
                      </span>
                    </label>
                    <input
                      id="fileUpload"
                      name="file"
                      type="file"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Upload File */}
            {/* <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Upload File
              </label>
              <div className="flex items-center space-x-6">
                <label
                  htmlFor="fileUpload"
                  className="flex items-center justify-center w-full p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <Image
                    src="/upload-icon.png"
                    alt="Upload"
                    width={30}
                    height={30}
                  />
                  <span className="ml-2 text-gray-600">Choose File</span>
                </label>
                <input
                  id="fileUpload"
                  name="file"
                  type="file"
                  className="hidden"
                />
              </div>
            </div> */}

            {/* Navigation Buttons */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleNext}
              >
                {t(`Next`)}
              </button>
            </div>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default ExchangeDetailsForm;

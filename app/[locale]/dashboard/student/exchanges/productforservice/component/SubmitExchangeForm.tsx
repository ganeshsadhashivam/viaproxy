"use client";

import React, { ChangeEvent } from "react";
import { Formik, Form } from "formik";
import { Input, Radio, Select, DatePicker } from "formik-antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setFormData,
  setCurrentStep,
} from "@/store/slices/productForServiceFormSlice";
import { RadioChangeEvent } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SubmitExchangeForm = () => {
  const t = useTranslations("form");
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector(
    (state: RootState) => state.productForServiceExchangeForm
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

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percentage = e.target.value;
    dispatch(
      setFormData({
        materialConditions: {
          ...formData.materialConditions,
          percentage,
        },
      })
    );
  };

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

  return (
    <Formik
      initialValues={{
        ...formData.proposedOffer,
        ...formData.materialConditions,
        ...formData.deliveryConditions,
        ...formData.expectedRequirements,
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
            ...formData.expectedRequirements,
            ...values,
          },
        };
        console.log("Collected Form Data:", collectedData);
        dispatch(setFormData(collectedData));
        dispatch(setCurrentStep(1)); // Move to the next step
      }}
    >
      {() => (
        <Form className="space-y-6 p-4 md:p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto border border-gray-200">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
              {t("Submit An Exchange Offer")}
            </h2>
            <p className="text-gray-600">
              {t(
                "Finance Your Projects Or Expenses With Your Unused Services Or Goods!"
              )}
            </p>
          </div>

          {/* Zone 1 insertion Banner */}
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
              <p className="text-gray-600">Click to upload</p>
            </label>
            <input
              id="zone1-banner"
              type="file"
              name="zone1 Advertising banner"
              className="hidden"
            />
          </div>

          <div className="bg-gray-50 text-center font-semibold">
            <h2>{t(`Details Of The Proposed Offer`)}</h2>
            <h2>{t(`Detail As Precisely As Possible What You Offer`)}</h2>
          </div>

          {/* Title of the Offer */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("Title of the Offer")}
            </label>
            <Input
              name="title"
              placeholder={t("Enter Title")}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Offer Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("what do you Offer")}
            </label>
            <Radio.Group name="offerType" className="flex flex-wrap gap-4">
              <Radio name="offerType" value="Good">
                {t("Good")}
              </Radio>
              <Radio name="offerType" value="Service">
                {t("Service")}
              </Radio>
            </Radio.Group>
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("Category")}
              </label>
              <Select
                name="category"
                placeholder={t("Category")}
                className="w-full"
              >
                <Select.Option value="Electronics">
                  {t("Electronics")}
                </Select.Option>
                <Select.Option value="Health">{t("Health")}</Select.Option>
              </Select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("SubCategory")}
              </label>
              <Select
                name="subcategory"
                placeholder={t("SubCategory")}
                className="w-full"
              >
                <Select.Option value="Accessories">
                  {t("Accessories")}
                </Select.Option>
                <Select.Option value="Health">{t("Health")}</Select.Option>
              </Select>
            </div>
          </div>

          {/* Featured Product Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("FeaturedProductStatus")}
            </label>
            <Select
              name="featuredProductStatus"
              placeholder={t("featuredProductStatus")}
              className="w-full"
            >
              <Select.Option value="New">{t("New")}</Select.Option>
              <Select.Option value="GoodCondition">
                {t("GoodCondition")}
              </Select.Option>
              <Select.Option value="Used">{t("Used")}</Select.Option>
            </Select>
          </div>

          {/* Additional Description of Your Offer */}
          {/* <div className="p-4 space-y-4">
            <label
              htmlFor="additionaldescription"
              className="block text-sm font-medium text-gray-700"
            >
              Additional description of your offer
            </label>
            <Input
              type="text"
              name="additionaldescription"
              id="additionaldescription"
              placeholder="Enter additional details about your offer"
              className="w-full p-2 border rounded-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
                    <span className="text-sm text-gray-500">Select Image</span>
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
                        Select Image
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

          {/* Offer Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("OfferStartDate")}
              </label>
              <DatePicker name="startDate" className="w-full" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("OfferEndDate")}
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

          {/* Material Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center">
              {t("Material conditions of the exchange")}
            </h3>
            <div>
              <p className="font-semibold text-gray-700">
                {t("Estimated value of the exchange")}
              </p>
              <Input type="number" name="estimatedValueofexchange" />
              <div>
                <label className="block text-gray-700 mb-1">
                  {t("Deposit Payment for booking")}
                </label>
                <Radio.Group
                  name="decision"
                  value={formData.materialConditions?.decision || ""}
                  onChange={handleDecisionChange}
                  className="flex gap-4"
                >
                  <Radio name="decision" value="yes">
                    {t("yes")}
                  </Radio>
                  <Radio name="decision" value="no">
                    {t("no")}
                  </Radio>
                </Radio.Group>
              </div>

              {formData.materialConditions?.decision === "yes" && (
                <div className="mt-4">
                  <label
                    htmlFor="percentage"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t("DepositPercentage")}
                  </label>
                  <Input
                    name="percentage"
                    id="percentage"
                    type="number"
                    value={formData.materialConditions?.percentage || ""}
                    onChange={handlePercentageChange}
                    placeholder={t("DepositPercentage")}
                    className="w-full"
                    min={0}
                    max={100}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Other Contingent Coverage Required */}
          <div className="font-semibold">
            <label htmlFor="othercontingentcoveragerequired">
              {t(`Other Contingent Coverage Required`)}
            </label>
            <Input
              type="text"
              name="othercontingentcoveragerequired"
              id="othercontingentcoveragerequired"
            />
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("MoneyBackGuarantee")}
            </label>
            <Radio.Group
              name="moneyBackGuarantee"
              className="flex flex-wrap gap-4"
            >
              <Radio name="moneyBackGuarantee" value="yes">
                {t("yes")}
              </Radio>
              <Radio name="moneyBackGuarantee" value="no">
                {t("no")}
              </Radio>
            </Radio.Group>
          </div>

          {/* Satisfaction Guarantee */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("SatisfactionGuarantee")}
            </label>
            <Radio.Group
              name="satisfactionGuarantee"
              className="flex flex-wrap gap-4"
            >
              <Radio name="satisfactionGuarantee" value="yes">
                {t("yes")}
              </Radio>
              <Radio name="satisfactionGuarantee" value="no">
                {t("no")}
              </Radio>
            </Radio.Group>
          </div>

          {/* Desired Payment Form */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("DesiredPaymentForm")}
            </label>
            <Select name="desiredPaymentForm" className="w-full">
              <Select.Option value="exchange-sum">
                {t("Exchange + or - Additional Sum")}
              </Select.Option>
              <Select.Option value="exchange-service">
                {t("Exchange + or - Benefit or Service")}
              </Select.Option>
            </Select>
          </div>

          {/* Desired Payment Type */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("DesiredPaymentType")}
            </label>
            <Select name="desiredPaymentType" className="w-full">
              <Select.Option value="hand-to-hand">
                {t("handToHand")}
              </Select.Option>
              <Select.Option value="before-delivery">
                {t("Exchange & Payment Before Delivery")}
              </Select.Option>
              <Select.Option value="after-delivery">
                {t("Exchange & Payment After Delivery")}
              </Select.Option>
            </Select>
          </div>

          {/* Delivery Conditions */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center mb-4">
              {t("DeliveryConditions")}
            </h2>

            {/* Pickup */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t("Pickup")}
              </label>
              <Radio.Group
                name="pickup"
                className="flex flex-wrap gap-4"
                value={formData.deliveryConditions?.pickup || ""}
                onChange={handlePickupChange}
              >
                <Radio name="pickup" value="yes">
                  {t("yes")}
                </Radio>
                <Radio name="pickup" value="no">
                  {t("no")}
                </Radio>
              </Radio.Group>
              {formData.deliveryConditions?.pickup === "yes" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("PickupAddress")}
                    </label>
                    <Input name="pickupAddress" placeholder={t("Address")} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("Country")}
                    </label>
                    <Input name="pickupCountry" placeholder={t("Country")} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("City")}
                    </label>
                    <Input name="pickupCity" placeholder={t("City")} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("campus")}
                    </label>
                    <Input name="pickupCampus" placeholder={t("Campus")} />
                  </div>
                </div>
              )}
            </div>

            {/* Delivery */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t("Delivery")}
              </label>
              <Radio.Group
                name="delivery"
                className="flex flex-wrap gap-4"
                value={formData.deliveryConditions?.delivery || ""}
                onChange={handleDeliveryChange}
              >
                <Radio name="delivery" value="yes">
                  {t("yes")}
                </Radio>
                <Radio name="delivery" value="no">
                  {t("no")}
                </Radio>
              </Radio.Group>
              {formData.deliveryConditions?.delivery === "yes" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("DeliveryCost (€)")}
                    </label>
                    <Input name="deliveryCost" placeholder={t("Cost")} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("Country")}
                    </label>
                    <Input name="deliveryCountry" placeholder={t("Country")} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t("City")}
                    </label>
                    <Input name="deliveryCity" placeholder={t("City")} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Geolocation */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center mb-4">
              {t("Geolocation")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="geoCampus"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  {t("Campus")}
                </label>
                <Input
                  id="geoCampus"
                  name="GeoLocation of campus"
                  type="text"
                  placeholder={t("CampusLocation")}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="geoCountry"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  {t("Country")}
                </label>
                <Input
                  id="geoCountry"
                  name="GeoLocation of country"
                  type="text"
                  placeholder={t("Country")}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
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

          {/* Navigation Buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleNext}
            >
              {t("Next")}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitExchangeForm;

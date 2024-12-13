"use client";

import React, { ChangeEvent } from "react";
import { Formik, Form } from "formik";
import { Input, Radio, Select, DatePicker } from "formik-antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setCurrentStep,
  setExchangeOffer,
} from "@/store/slices/productForProductFormSlice";
import { RadioChangeEvent } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SubmitExchangeForm = () => {
  const t = useTranslations("form");
  const dispatch = useDispatch();
  const { formData, currentStep } = useSelector(
    (state: RootState) => state.productForProductExchangeForm
  );

  //for Zone1 insertion banner
  const handleZoneOneBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          dispatch(
            setExchangeOffer({
              zoneOneBanner: reader.result.toString(), // Store base64 encoded string
            })
          );
        }
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  //for selecting multiple images
  const handleImageChange = (index: number, file: File | null) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const updatedImages = [...formData.exchangeOffer.images];
        updatedImages[index] = reader.result.toString(); // Add/replace the image at the given index

        // Ensure only 3 images are stored
        const limitedImages = updatedImages.filter((img) => img).slice(0, 3);

        dispatch(setExchangeOffer({ images: limitedImages }));
      }
    };

    reader.readAsDataURL(file);
  };

  // for Material Conditions
  const handleDecisionChange = (e: RadioChangeEvent) => {
    const decision = e.target.value as "yes" | "no";

    const updatedMaterialConditions =
      decision === "yes"
        ? {
            decision,
            depositPayment: {
              required: true,
              percentage:
                formData.exchangeOffer.materialConditions?.depositPayment
                  ?.percentage ?? 0, // Default value
            },
            // estimatedValue:
            // formData.exchangeOffer.materialConditions?.estimatedValue,
            otherContingentCoverageRequired:
              formData.exchangeOffer.materialConditions
                ?.otherContingentCoverageRequired,
          }
        : {
            decision,
            depositPayment: {
              required: false,
            },
            estimatedValue:
              formData.exchangeOffer.materialConditions?.estimatedValue,
            otherContingentCoverageRequired:
              formData.exchangeOffer.materialConditions
                ?.otherContingentCoverageRequired,
          };

    dispatch(
      setExchangeOffer({ materialConditions: updatedMaterialConditions })
    );
  };

  //handle File Change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Convert the file to a URL for preview
      const fileUrl = URL.createObjectURL(file);

      // Dispatch the file URL to Redux
      dispatch(
        setExchangeOffer({
          otherSpecialConditions: {
            ...formData.exchangeOffer.otherSpecialConditions, // Preserve existing data
            uploadedFiles: [
              ...(formData.exchangeOffer.otherSpecialConditions
                ?.uploadedFiles || []),
              fileUrl, // Add the new file URL to the array
            ],
          },
        })
      );
    }
  };

  const handleEstimatedValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;

    const updatedMaterialConditions = {
      ...formData.exchangeOffer.materialConditions,
      estimatedValue: value, // Update estimatedValue
      decision: formData.exchangeOffer.materialConditions?.decision ?? "no", // Ensure decision is always set
      depositPayment: {
        ...formData.exchangeOffer.materialConditions?.depositPayment,
        required:
          formData.exchangeOffer.materialConditions?.depositPayment?.required ??
          false, // Ensure required is always set
      },
    };

    dispatch(
      setExchangeOffer({
        materialConditions: updatedMaterialConditions,
      })
    );
  };

  const handleContingentCoverageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const updatedMaterialConditions = {
      ...formData.exchangeOffer.materialConditions,
      otherContingentCoverageRequired: value, // Update contingent coverage
      decision: formData.exchangeOffer.materialConditions?.decision ?? "no", // Ensure decision is always set
      depositPayment: {
        ...formData.exchangeOffer.materialConditions?.depositPayment,
        required:
          formData.exchangeOffer.materialConditions?.depositPayment?.required ??
          false, // Ensure required is always set
      },
      estimatedValue: formData.exchangeOffer.materialConditions?.estimatedValue, // Retain existing estimatedValue
    };

    dispatch(
      setExchangeOffer({
        materialConditions: updatedMaterialConditions,
      })
    );
  };

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percentage = e.target.value ? parseFloat(e.target.value) : undefined;

    const updatedMaterialConditions = {
      ...formData.exchangeOffer.materialConditions,
      decision: formData.exchangeOffer.materialConditions?.decision ?? "yes", // Ensure decision is always present
      depositPayment: {
        required:
          formData.exchangeOffer.materialConditions?.depositPayment?.required ??
          true, // Always explicitly set required
        percentage, // Update only the percentage
      },
      // estimatedValue:
      //   formData.exchangeOffer.materialConditions?.estimatedValue ?? null, // Preserve or set default
      otherContingentCoverageRequired:
        formData.exchangeOffer.materialConditions
          ?.otherContingentCoverageRequired ?? "", // Preserve or set default
    };

    dispatch(
      setExchangeOffer({ materialConditions: updatedMaterialConditions })
    );
  };

  const handleMoneyBackGuaranteeChange = (e: RadioChangeEvent) => {
    const value = e.target.value === "yes"; // Convert "yes"/"no" to boolean

    dispatch(
      setExchangeOffer({
        guarantees: {
          ...formData.exchangeOffer.guarantees,
          moneyBackGuarantee: value,
          satisfactionGuarantee:
            formData.exchangeOffer.guarantees?.satisfactionGuarantee ?? false, // Ensure satisfactionGuarantee is always set
        },
      })
    );
  };

  const handleSatisfactionGuaranteeChange = (e: RadioChangeEvent) => {
    const value = e.target.value === "yes";
    dispatch(
      setExchangeOffer({
        guarantees: {
          ...formData.exchangeOffer.guarantees,
          satisfactionGuarantee: value,
          moneyBackGuarantee:
            formData.exchangeOffer.guarantees?.moneyBackGuarantee ?? false, // Ensure moneyBackGuarantee is always defined
        },
      })
    );
  };

  const handlePickupAllowedChange = (value: string) => {
    dispatch(
      setExchangeOffer({
        deliveryConditions: {
          ...formData.exchangeOffer.deliveryConditions,
          pickup: {
            allowed: value === "yes",
            details: {
              ...formData.exchangeOffer.deliveryConditions?.pickup?.details,
            },
          },
        },
      })
    );
  };

  const handlePickupDetailChange = (key: string, value: string) => {
    dispatch(
      setExchangeOffer({
        deliveryConditions: {
          ...formData.exchangeOffer.deliveryConditions,
          pickup: {
            allowed:
              formData.exchangeOffer.deliveryConditions?.pickup?.allowed ||
              false, // Ensure `allowed` is always a boolean
            details: {
              ...formData.exchangeOffer.deliveryConditions?.pickup?.details,
              [key]: value,
            },
          },
        },
      })
    );
  };

  const handleDeliveryAllowedChange = (value: string) => {
    dispatch(
      setExchangeOffer({
        deliveryConditions: {
          ...formData.exchangeOffer.deliveryConditions,
          delivery: {
            allowed: value === "yes",
            details: {
              ...formData.exchangeOffer.deliveryConditions?.delivery?.details,
            },
          },
        },
      })
    );
  };

  const handleDeliveryDetailChange = (key: string, value: string) => {
    dispatch(
      setExchangeOffer({
        deliveryConditions: {
          ...formData.exchangeOffer.deliveryConditions,
          delivery: {
            allowed:
              formData.exchangeOffer.deliveryConditions?.delivery?.allowed ||
              false,
            details: {
              ...formData.exchangeOffer.deliveryConditions?.delivery?.details,
              [key]: value,
            },
          },
        },
      })
    );
  };

  const handleNext = () => dispatch(setCurrentStep(currentStep + 1));
  // const handleBack = () => dispatch(setCurrentStep(currentStep - 1));

  return (
    <Formik
      initialValues={formData.exchangeOffer}
      onSubmit={(values) => {
        dispatch(setExchangeOffer(values));
        console.log(formData.exchangeOffer);
        dispatch(setCurrentStep(1)); // Move to the next step
      }}
    >
      {() => (
        <Form className="space-y-6 p-4 md:p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto border border-gray-200">
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
                src={
                  formData.exchangeOffer.zoneOneBanner || "/imagetoselect.png"
                } // Replace with the URL or path to your upload icon/image
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
              onChange={handleZoneOneBannerChange}
            />
          </div>
          ;{/* Navigation Buttons */}
          <div className="flex justify-end">
            <button
              // type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              // onClick={handleNext}
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

{
  /* Title */
}
<div className="text-center">
  <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
    {t("Submit An Exchange Offer")}
  </h2>
  <p className="text-gray-600">
    {t("Finance Your Projects Or Expenses With Your Unused Services Or Goods!")}
  </p>
</div>;

{
  /* Zone 1 insertion Banner */
}
<div className="text-center p-5">
  <h2 className="mb-5 text-lg font-bold">
    {t("Zone 1 Insertion Banner Advertising")}
  </h2>
  <label
    htmlFor="zone1-banner"
    className="inline-block cursor-pointer p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200"
  >
    <Image
      src={formData.exchangeOffer.zoneOneBanner || "/imagetoselect.png"} // Replace with the URL or path to your upload icon/image
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
    onChange={handleZoneOneBannerChange}
  />
</div>;

{
  /* Details of the proposed offer      */
}
<div className="bg-gray-50 text-center font-semibold">
  <h2>{t(`Details Of The Proposed Offer`)}</h2>
  <h2>{t(`Detail As Precisely As Possible What You Offer`)}</h2>
</div>;

{
  /* Title of the Offer */
}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    {t("Title of the Offer")}
  </label>
  <Input
    name="title"
    placeholder={t("Enter Title")}
    className="w-full p-2 border rounded-md"
    value={formData.exchangeOffer.title} // Bind value to Redux state
    onChange={(e) => dispatch(setExchangeOffer({ title: e.target.value }))}
  />
</div>;

{
  /* Offer Type */
}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    {t("what do you Offer")}
  </label>
  <Radio.Group
    name="offerType"
    className="flex flex-wrap gap-4"
    value={formData.exchangeOffer.offerType}
    onChange={(e) => {
      const value = e.target.value as "Good" | "Service"; // Explicitly cast value to the expected type
      dispatch(setExchangeOffer({ offerType: value }));
    }}
  >
    <Radio name="offerType" value="Good">
      {t("Good")}
    </Radio>
    <Radio name="offerType" value="Service">
      {t("Service")}
    </Radio>
  </Radio.Group>
</div>;

{
  /* Category and Subcategory */
}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 font-semibold mb-1">
      {t("Category")}
    </label>
    <Select
      name="category"
      placeholder={t("Category")}
      className="w-full"
      value={formData.exchangeOffer.category}
      onChange={(value) => dispatch(setExchangeOffer({ category: value }))}
    >
      <Select.Option value="Electronics">{t("Electronics")}</Select.Option>
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
      value={formData.exchangeOffer.subcategory}
      onChange={(value) => dispatch(setExchangeOffer({ subcategory: value }))}
    >
      <Select.Option value="Accessories">{t("Accessories")}</Select.Option>
      <Select.Option value="Health">{t("Health")}</Select.Option>
    </Select>
  </div>
</div>;

{
  /* Featured Product Status */
}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    {t("FeaturedProductStatus")}
  </label>
  <Select
    name="featuredProductStatus"
    placeholder={t("featuredProductStatus")}
    className="w-full"
    value={formData.exchangeOffer.featuredProductStatus}
    onChange={(value) =>
      dispatch(setExchangeOffer({ featuredProductStatus: value }))
    }
  >
    <Select.Option value="New">{t("New")}</Select.Option>
    <Select.Option value="GoodCondition">{t("GoodCondition")}</Select.Option>
    <Select.Option value="Used">{t("Used")}</Select.Option>
  </Select>
</div>;

{
  /* Additional Description of Your Offer */
}
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
    value={formData.exchangeOffer.additionalDescription || ""}
    onChange={(e) =>
      dispatch(setExchangeOffer({ additionalDescription: e.target.value }))
    }
  />

  {/* images to select */}
  <div className="mt-4">
    <label
      htmlFor="offer-images"
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {t(`Upload Any Images Of The Offer`)}
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <label
            htmlFor={`offer-image-${index}`}
            className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-400 hover:bg-gray-50"
          >
            <Image
              src={formData.exchangeOffer.images[index] || "/imagetoselect.png"} // Show selected image or default placeholder // Replace this with your actual icon path
              alt="Select Image"
              // className="h-12 w-12"
              className="object-cover w-20 h-20 rounded-md"
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
            onChange={(e) =>
              handleImageChange(index, e.target.files?.[0] || null)
            }
          />
        </div>
      ))}
    </div>
  </div>
</div>;

{
  /* Offer Dates */
}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 font-semibold mb-1">
      {t("OfferStartDate")}
    </label>
    <DatePicker
      name="startDate"
      className="w-full"
      onChange={(date) =>
        dispatch(setExchangeOffer({ startDate: date?.toDate() || null }))
      }
    />
  </div>
  <div>
    <label className="block text-gray-700 font-semibold mb-1">
      {t("OfferEndDate")}
    </label>
    <DatePicker
      name="endDate"
      className="w-full"
      onChange={(date) =>
        dispatch(setExchangeOffer({ endDate: date?.toDate() || null }))
      }
    />
  </div>
</div>;

{
  /* Form of Exchange */
}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    {t("FormOfExchange")}
  </label>
  <Select
    name="formOfExchange"
    placeholder={t("formOfExchange")}
    className="w-full"
    value={formData.exchangeOffer.formOfExchange}
    onChange={(value) => dispatch(setExchangeOffer({ formOfExchange: value }))}
  >
    <Select.Option value="Exchange">{t("Exchange")}</Select.Option>
    <Select.Option value="Classic Sale">{t("Classic Sale")}</Select.Option>
    <Select.Option value="Auction">{t("Auction")}</Select.Option>
    <Select.Option value="Donation">{t("Donation")}</Select.Option>
  </Select>
</div>;

{
  /* Material Conditions */
}
<div className="space-y-4">
  <h3 className="text-lg font-bold text-center">
    {t("Material conditions of the exchange")}
  </h3>
  <div>
    <p className="font-semibold text-gray-700">
      {t("Estimated value of the exchange")}
    </p>
    <Input
      name="estimatedValueofExchange"
      type="number"
      value={formData.exchangeOffer.materialConditions?.estimatedValue || ""}
      onChange={handleEstimatedValueChange} // Attach the handler
    />
    <div>
      <label className="block text-gray-700 mb-1">
        {t("Deposit Payment for booking")}
      </label>
      <Radio.Group
        name="decision"
        value={formData.exchangeOffer.materialConditions?.decision || ""}
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

    {formData.exchangeOffer.materialConditions?.decision === "yes" && (
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
          value={
            formData.exchangeOffer.materialConditions?.depositPayment
              ?.percentage || ""
          }
          onChange={handlePercentageChange}
          placeholder={t("DepositPercentage")}
          className="w-full"
          min={0}
          max={100}
        />
      </div>
    )}
  </div>
</div>;

{
  /* Other Contingent Coverage Required */
}
<div className="font-semibold">
  <label htmlFor="othercontingentcoveragerequired">
    {t(`Other Contingent Coverage Required`)}
  </label>
  <Input
    type="text"
    name="othercontingentcoveragerequired"
    id="othercontingentcoveragerequired"
    value={
      formData.exchangeOffer.materialConditions
        ?.otherContingentCoverageRequired || ""
    }
    onChange={handleContingentCoverageChange} // Attach the handler
  />
</div>;

{
  /* Money Back Guarantee */
}
<div className="mt-4">
  <label className="block text-gray-700 font-semibold mb-1">
    {t("MoneyBackGuarantee")}
  </label>
  <Radio.Group
    name="moneyBackGuarantee"
    className="flex flex-wrap gap-4"
    value={formData.exchangeOffer.guarantees?.moneyBackGuarantee ? "yes" : "no"} // Map boolean to "yes"/"no"
    onChange={handleMoneyBackGuaranteeChange} // Handle state update
  >
    <Radio name="moneyBackGuarantee" value="yes">
      {t("yes")}
    </Radio>
    <Radio name="moneyBackGuarantee" value="no">
      {t("no")}
    </Radio>
  </Radio.Group>
</div>;

{
  /* Satisfaction Guarantee */
}
<div className="mt-4">
  <label className="block text-gray-700 font-semibold mb-1">
    {t("SatisfactionGuarantee")}
  </label>
  <Radio.Group
    name="satisfactionGuarantee"
    className="flex flex-wrap gap-4"
    value={
      formData.exchangeOffer.guarantees?.satisfactionGuarantee ? "yes" : "no"
    } // Map boolean to "yes"/"no"
    onChange={handleSatisfactionGuaranteeChange} // Handle state update
  >
    <Radio name="satisfactionGuarantee" value="yes">
      {t("yes")}
    </Radio>
    <Radio name="satisfactionGuarantee" value="no">
      {t("no")}
    </Radio>
  </Radio.Group>
</div>;

{
  /* Desired Payment Form */
}
<div className="mt-4">
  <label className="block text-gray-700 font-semibold mb-1">
    {t("DesiredPaymentForm")}
  </label>
  <Select
    name="desiredPaymentForm"
    className="w-full"
    value={formData.exchangeOffer.paymentDetails?.desiredPaymentForm}
    onChange={(value) =>
      dispatch(
        setExchangeOffer({
          paymentDetails: {
            ...formData.exchangeOffer.paymentDetails,
            desiredPaymentForm: value, // Update desiredPaymentForm in Redux state
          },
        })
      )
    }
  >
    <Select.Option value="exchange-sum">
      {t("Exchange + or - Additional Sum")}
    </Select.Option>
    <Select.Option value="exchange-service">
      {t("Exchange + or - Benefit or Service")}
    </Select.Option>
  </Select>
</div>;

{
  /* Desired Payment Type */
}
<div className="mt-4">
  <label className="block text-gray-700 font-semibold mb-1">
    {t("DesiredPaymentType")}
  </label>
  <Select
    name="desiredPaymentType"
    className="w-full"
    value={formData.exchangeOffer.paymentDetails?.desiredPaymentType}
    onChange={(value) =>
      dispatch(
        setExchangeOffer({
          paymentDetails: {
            ...formData.exchangeOffer.paymentDetails,
            desiredPaymentType: value, // Update desiredPaymentForm in Redux state
          },
        })
      )
    }
  >
    <Select.Option value="hand-to-hand">{t("handToHand")}</Select.Option>
    <Select.Option value="before-delivery">
      {t("Exchange & Payment Before Delivery")}
    </Select.Option>
    <Select.Option value="after-delivery">
      {t("Exchange & Payment After Delivery")}
    </Select.Option>
  </Select>
</div>;

{
  /* Delivery Conditions */
}
<div className="mt-6">
  <h2 className="text-xl font-bold text-center mb-4">
    {t("DeliveryConditions")}
  </h2>

  {/* Pickup */}
  {/* og code */}
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold mb-1">
      {t("Pickup")}
    </label>

    <Radio.Group
      name="pickup"
      className="flex flex-wrap gap-4"
      value={
        formData.exchangeOffer.deliveryConditions?.pickup?.allowed
          ? "yes"
          : "no"
      }
      onChange={(e) => handlePickupAllowedChange(e.target.value)} // Use an intermediate handler
    >
      <Radio name="pickup" value="yes">
        {t("yes")}
      </Radio>
      <Radio name="pickup" value="no">
        {t("no")}
      </Radio>
    </Radio.Group>

    {formData.exchangeOffer.deliveryConditions?.pickup?.allowed && (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">
            {t("PickupAddress")}
          </label>
          <Input
            name="pickupAddress"
            value={
              formData.exchangeOffer.deliveryConditions?.pickup?.details
                ?.address || ""
            }
            onChange={(e) =>
              handlePickupDetailChange("address", e.target.value)
            }
            placeholder={t("Address")}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">{t("Country")}</label>
          <Input
            name="pickupCountry"
            value={
              formData.exchangeOffer.deliveryConditions?.pickup?.details
                ?.country || ""
            }
            onChange={(e) =>
              handlePickupDetailChange("country", e.target.value)
            }
            placeholder={t("Country")}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">{t("City")}</label>
          <Input
            name="pickupCity"
            value={
              formData.exchangeOffer.deliveryConditions?.pickup?.details
                ?.city || ""
            }
            onChange={(e) => handlePickupDetailChange("city", e.target.value)}
            placeholder={t("City")}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">{t("campus")}</label>
          <Input
            name="pickupCampus"
            value={
              formData.exchangeOffer.deliveryConditions?.pickup?.details
                ?.campus || ""
            }
            onChange={(e) => handlePickupDetailChange("campus", e.target.value)}
            placeholder={t("Campus")}
          />
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
      value={
        formData.exchangeOffer.deliveryConditions?.delivery?.allowed
          ? "yes"
          : "no"
      }
      onChange={(e) => handleDeliveryAllowedChange(e.target.value)}
    >
      <Radio name="delivery" value="yes">
        {t("yes")}
      </Radio>
      <Radio name="delivery" value="no">
        {t("no")}
      </Radio>
    </Radio.Group>

    {formData.exchangeOffer.deliveryConditions?.delivery?.allowed && (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">
            {t("DeliveryCost (€)")}
          </label>
          <Input
            name="deliveryCost"
            value={
              formData.exchangeOffer.deliveryConditions?.delivery?.details
                ?.cost || ""
            }
            onChange={(e) => handleDeliveryDetailChange("cost", e.target.value)}
            placeholder={t("Cost")}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">{t("Country")}</label>
          <Input
            name="deliveryCountry"
            value={
              formData.exchangeOffer.deliveryConditions?.delivery?.details
                ?.country || ""
            }
            onChange={(e) =>
              handleDeliveryDetailChange("country", e.target.value)
            }
            placeholder={t("Country")}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">{t("City")}</label>
          <Input
            name="deliveryCity"
            value={
              formData.exchangeOffer.deliveryConditions?.delivery?.details
                ?.city || ""
            }
            onChange={(e) => handleDeliveryDetailChange("city", e.target.value)}
            placeholder={t("City")}
          />
        </div>
      </div>
    )}
  </div>
</div>;

{
  /* Geolocation */
}
<div className="mt-4">
  <h2 className="text-xl font-bold text-center mb-4">{t("Geolocation")}</h2>
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
        value={formData.exchangeOffer.geolocation?.campus || ""}
        onChange={(e) =>
          dispatch(
            setExchangeOffer({
              geolocation: {
                ...formData.exchangeOffer.geolocation,
                campus: e.target.value, // Update campus
              },
            })
          )
        }
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
        value={formData.exchangeOffer.geolocation?.country || ""}
        onChange={(e) =>
          dispatch(
            setExchangeOffer({
              geolocation: {
                ...formData.exchangeOffer.geolocation,
                country: e.target.value, // Update country
              },
            })
          )
        }
      />
    </div>
  </div>
</div>;
{
  /* other special conditions */
}
<div className="mt-4">
  <h2 className="text-xl font-bold text-center mb-4">
    {t("Other Special Conditions")}
  </h2>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <label
        htmlFor="AdditionalDescriptionofpaymentorDeliveryMethod"
        className="block text-gray-700 font-semibold mb-1"
      >
        {t("Additional Description of the payment or Delivery Method")}
      </label>
      <textarea
        id="AdditionalDescriptionofpaymentorDeliveryMethod"
        name="description"
        placeholder={t("Description")}
        rows={4}
        className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={
          formData.exchangeOffer.otherSpecialConditions
            ?.additionalDescription || ""
        }
        onChange={(e) =>
          dispatch(
            setExchangeOffer({
              otherSpecialConditions: {
                ...formData.exchangeOffer.otherSpecialConditions,
                additionalDescription: e.target.value, // Update description
              },
            })
          )
        }
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
          <span className="text-gray-600 text-base">{t("chooseFile")}</span>
        </label>
        <input
          id="fileUpload"
          name="file"
          type="file"
          className="hidden"
          onChange={handleFileChange} // Attach the handler
        />
      </div>
    </div>
  </div>
</div>;

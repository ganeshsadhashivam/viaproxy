"use client";

import React from "react";
import { Formik, Form } from "formik";
import { RadioChangeEvent } from "antd";
import { Input, Radio, Select, DatePicker } from "formik-antd";
import Image from "next/image";
import { useFormContext } from "../component/FormContext";

const ExchangeDetailsForm = () => {
  const { formData, setFormData, handleNext } = useFormContext();

  const handleDecisionChange = (e: RadioChangeEvent) => {
    const decision = e.target.value;
    setFormData((prev) => ({
      ...prev,
      materialConditions: {
        ...prev.materialConditions,
        decision,
        percentage:
          decision === "no" ? "" : prev.materialConditions?.percentage || "",
      },
    }));
  };

  const handlePickupChange = (e: RadioChangeEvent) => {
    const pickup = e.target.value as "" | "yes" | "no"; // Explicitly cast to the expected literal type

    setFormData((prev) => ({
      ...prev,
      deliveryConditions: {
        ...prev.deliveryConditions,
        pickup,
        pickupDetails:
          pickup === "no" ? "" : prev.deliveryConditions.pickupDetails || "",
      },
      // Ensure expectedRequirements is included in the updated object
      expectedRequirements: prev.expectedRequirements,
    }));
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

  const handleDeliveryChange = (e: RadioChangeEvent) => {
    const delivery = e.target.value as "" | "yes" | "no"; // Explicitly cast to the literal type

    setFormData((prev) => ({
      ...prev,
      deliveryConditions: {
        ...prev.deliveryConditions,
        delivery,
        deliveryCost:
          delivery === "no" ? "" : prev.deliveryConditions.deliveryCost || "",
      },
      // Preserve the existing expectedRequirements field
      expectedRequirements: prev.expectedRequirements,
    }));
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
        console.log("Collected Form Data:", collectedData);
        setFormData(collectedData);
        handleNext();
      }}
    >
      {() => (
        <Form className="space-y-6 p-4 md:p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto border border-gray-200">
          <>
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
                Details Of the Expected Requirements
              </h2>
              <p className="text-gray-600">
                Finance your projects or expenses with your unused services or
                goods!
              </p>
            </div>

            <div>
              <Input type="file" name="zone1adv" />
            </div>

            <div className="text-center">
              <h4>Details of the Expected need </h4>
              <h4>Detail your needs as preceisely as possible</h4>
            </div>

            {/* Title of the Offer */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Title of the Offer
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
                What do you offer?
              </label>
              <Radio.Group name="offerType" className="flex flex-wrap gap-4">
                <Radio name="Good" value="Good">
                  A Good
                </Radio>
                <Radio name="Service" value="Service">
                  A Service
                </Radio>
              </Radio.Group>
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Category
                </label>
                <Select
                  name="category"
                  placeholder="Select Category"
                  className="w-full"
                >
                  <Select.Option value="Electronics">Electronics</Select.Option>
                  <Select.Option value="Health">Health</Select.Option>
                </Select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Subcategory
                </label>
                <Select
                  name="subcategory"
                  placeholder="Select Subcategory"
                  className="w-full"
                >
                  <Select.Option value="Accessories">Accessories</Select.Option>
                  <Select.Option value="Health">Health</Select.Option>
                </Select>
              </div>
            </div>

            {/* Featured Product Status */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Desired Product Status
              </label>
              <Select
                name="featuredProductStatus"
                placeholder="Select Status"
                className="w-full"
              >
                <Select.Option value="Nine">Nine</Select.Option>
                <Select.Option value="Very Good Condition">
                  Very Good Condition
                </Select.Option>
                <Select.Option value="Good Conditon">
                  Good Conditon
                </Select.Option>
                <Select.Option value="Used">Used</Select.Option>
                <Select.Option value="Need for repair">
                  Need for repair
                </Select.Option>
              </Select>
            </div>

            {/* Additional description of your needs */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Additional description of your needs
              </label>
              <textarea
                name="additionaldescription"
                placeholder="Provide details"
                rows={4}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* images to be selected */}
            <div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-center mb-4">
                  Upload Images of Desired Product
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Select up to 3 images of the product you want to upload.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Image Upload Field 1 */}
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="image1"
                      className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    >
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
                      <Image
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
                  </div>

                  {/* Image Upload Field 2 */}
                  <div className="flex flex-col items-center">
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
                  </div>

                  {/* Image Upload Field 3 */}
                  <div className="flex flex-col items-center">
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
                  </div>
                </div>
              </div>
              upload any images of desired product
            </div>

            {/* Offer Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Offer Start Date
                </label>
                <DatePicker name="startDate" className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Offer End Date
                </label>
                <DatePicker name="endDate" className="w-full" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
                Material Conditions of the Exchange
              </h2>
              <p className="text-gray-600">
                Provide details regarding payment and delivery conditions.
              </p>
            </div>

            {/* Estimated Value */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Estimated Value of the Exchange
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
                Deposit Payment for Booking
              </label>
              <Radio.Group
                name="decision"
                value={formData.materialConditions?.decision || ""}
                onChange={handleDecisionChange}
                className="flex flex-wrap gap-4"
              >
                <Radio name="depositpaymentyes" value="yes">
                  Yes
                </Radio>
                <Radio name="depositpaymentno" value="no">
                  No
                </Radio>
              </Radio.Group>
              {formData.materialConditions?.decision === "yes" && (
                <div className="mt-4">
                  <label
                    htmlFor="percentage"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Deposit Percentage (%):
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

            {/* Money Back Guarantee */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Money Back Guarantee:
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
                  Yes
                </Radio>
                <Radio
                  name="moneyBackGuarantee"
                  value="no"
                  className="w-full sm:w-auto text-center"
                >
                  No
                </Radio>
              </Radio.Group>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Satisfaction or Exchange Guarantee:
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
                  Yes
                </Radio>
                <Radio
                  name="satisfactionGuarantee"
                  value="no"
                  className="w-full sm:w-auto text-center"
                >
                  No
                </Radio>
              </Radio.Group>
            </div>

            {/* Other Contingent Coverage */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Other Contingent Coverage Required
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
                  Desired Payment Form
                </label>
                <Select
                  name="desiredPaymentForm"
                  placeholder="Select Payment Form"
                  className="w-full"
                >
                  <Select.Option value="exchange-sum">
                    Exchange +/- Sum
                  </Select.Option>
                  <Select.Option value="exchange-service">
                    Exchange +/- Service
                  </Select.Option>
                </Select>
              </div>

              {/* Payment Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Desired Payment Type
                </label>
                <Select
                  name="desiredPaymentType"
                  placeholder="Select Payment Type"
                  className="w-full"
                >
                  <Select.Option value="hand-to-hand">
                    Hand-to-Hand Exchange
                  </Select.Option>
                  <Select.Option value="before-delivery">
                    Payment Before Delivery
                  </Select.Option>
                  <Select.Option value="after-delivery">
                    Payment After Delivery
                  </Select.Option>
                </Select>
              </div>
            </div>

            {/* Delivery Conditions */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-center mb-4">
                Delivery Conditions
              </h2>

              {/* Pickup */}
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Pickup:
                </label>
                <Radio.Group
                  name="pickup"
                  className="flex flex-wrap gap-4"
                  value={formData.deliveryConditions?.pickup || ""}
                  onChange={handlePickupChange}
                >
                  <Radio name="pickup" value="yes">
                    Yes
                  </Radio>
                  <Radio name="pickup" value="no">
                    No
                  </Radio>
                </Radio.Group>
                {formData.deliveryConditions?.pickup === "yes" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Pickup Address:
                      </label>
                      <Input name="pickupAddress" placeholder="Enter Address" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Country:
                      </label>
                      <Input name="pickupCountry" placeholder="Enter Country" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">City:</label>
                      <Input name="pickupCity" placeholder="Enter City" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Campus:
                      </label>
                      <Input name="pickupCampus" placeholder="Enter Campus" />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Delivery:
                </label>
                <Radio.Group
                  name="delivery"
                  className="flex flex-wrap gap-4"
                  value={formData.deliveryConditions?.delivery || ""}
                  onChange={handleDeliveryChange}
                >
                  <Radio name="delivery" value="yes">
                    Yes
                  </Radio>
                  <Radio name="delivery" value="no">
                    No
                  </Radio>
                </Radio.Group>
                {formData.deliveryConditions?.delivery === "yes" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Delivery Cost:
                      </label>
                      <Input name="deliveryCost" placeholder="Enter Cost" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Country:
                      </label>
                      <Input
                        name="deliveryCountry"
                        placeholder="Enter Country"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">City:</label>
                      <Input name="deliveryCity" placeholder="Enter City" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* geolocation of the transaction */}
            <div className="mt-4">
              <h2 className="text-xl font-bold text-center mb-4">
                Geolocation of the transaction
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="geoCampus"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    GeoLocation of Campus
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
                    GeoLocation of Country
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

            <div className="mt-4">
              <h2 className="text-xl font-bold text-center mb-4">
                Other Special Conditions
              </h2>
              <p className="text-gray-700 text-center mb-4">
                Additional description of the payment or delivery methods
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Textarea Input */}
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

                {/* File Input */}
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
              >
                Next
              </button>
            </div>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default ExchangeDetailsForm;

{
  /* Delivery Conditions */
}
{
  /* <div>
  <h3 className="text-lg font-bold mb-4 text-center">Delivery Conditions</h3>
  {/* Pickup 
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold mb-1">Pickup:</label>
    <Radio.Group name="pickup" className="flex flex-wrap gap-4">
      <Radio value="yes">Yes</Radio>
      <Radio value="no">No</Radio>
    </Radio.Group>
  </div>

  {/* Pickup Details 
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Address</label>
      <Input
        name="pickupAddress"
        placeholder="Enter address"
        className="w-full"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Country</label>
      <Input
        name="pickupCountry"
        placeholder="Enter country"
        className="w-full"
      />
    </div>
  </div>
</div>; */
}

{
  /* Other Special Conditions */
}
{
  /* <div className="mt-4">
<h3 className="text-lg font-bold mb-4 text-center">
  Other Special Conditions
</h3>
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    Additional Description
  </label>
  <textarea
    name="specialDescription"
    rows={4}
    placeholder="Enter additional description"
    className="w-full p-3 border rounded-md resize-none"
  ></textarea>
</div>
</div> */
}

// import { Formik, Form } from "formik";
// import { Input, Radio, Select, TextArea } from "formik-antd";
// import { useFormContext } from "../component/FormContext";

// const MaterialExchangeForm = () => {
//   const { handleBack } = useFormContext();

//   return (
//     <Formik
//       initialValues={{
//         estimatedValue: "",
//         depositPayment: "",
//         contingentCoverage: "",
//         moneyBackGuarantee: "",
//         satisfactionGuarantee: "",
//         desiredPaymentForm: "",
//         desiredPaymentType: "",
//         pickup: "",
//         pickupAddress: "",
//         country: "",
//         city: "",
//         campus: "",
//         delivery: "",
//         deliveryCost: "",
//         geolocationCampus: "",
//         geolocationCountry: "",
//         specialConditions: "",
//       }}
//       onSubmit={(values) => {
//         console.log("Form Data:", values);
//       }}
//     >
//       {() => (
//         <Form className="space-y-6 p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
//           {/* Section: Material Conditions */}
//           <div>
//             <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
//               Material Conditions of the Exchange
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Estimated Value of the Exchange (€)
//                 </label>
//                 <Input name="estimatedValue" placeholder="Enter value" />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Deposit Payment (%)
//                 </label>
//                 <Input name="depositPayment" placeholder="Enter percentage" />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Contingent Coverage
//                 </label>
//                 <Input.TextArea
//                   name="contingentCoverage"
//                   rows={4}
//                   placeholder="Enter details of coverage"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Money Back Guarantee
//                 </label>
//                 <Radio.Group name="moneyBackGuarantee" className="space-x-4">
//                   <Radio value="yes">Yes</Radio>
//                   <Radio value="no">No</Radio>
//                 </Radio.Group>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Satisfaction Guarantee
//                 </label>
//                 <Radio.Group name="satisfactionGuarantee" className="space-x-4">
//                   <Radio value="yes">Yes</Radio>
//                   <Radio value="no">No</Radio>
//                 </Radio.Group>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Desired Payment Form
//                 </label>
//                 <Select name="desiredPaymentForm" placeholder="Select form">
//                   <Select.Option value="exchangeAdditionalSum">
//                     Exchange +/- Additional Sum
//                   </Select.Option>
//                   <Select.Option value="exchangeService">
//                     Exchange +/- Benefit or Service
//                   </Select.Option>
//                 </Select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Desired Payment Type
//                 </label>
//                 <Select name="desiredPaymentType" placeholder="Select type">
//                   <Select.Option value="handToHand">
//                     Hand-to-Hand Exchange
//                   </Select.Option>
//                   <Select.Option value="beforeDelivery">
//                     Exchange & Payment Before Delivery
//                   </Select.Option>
//                   <Select.Option value="afterDelivery">
//                     Exchange & Payment After Delivery
//                   </Select.Option>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Section: Delivery Conditions */}
//           <div>
//             <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
//               Delivery Conditions
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Pickup
//                 </label>
//                 <Radio.Group name="pickup" className="space-x-4">
//                   <Radio value="yes">Yes</Radio>
//                   <Radio value="no">No</Radio>
//                 </Radio.Group>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Pickup Address
//                 </label>
//                 <Input name="pickupAddress" placeholder="Enter address" />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Country
//                 </label>
//                 <Input name="country" placeholder="Enter country" />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   City
//                 </label>
//                 <Input name="city" placeholder="Enter city" />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Campus
//                 </label>
//                 <Input name="campus" placeholder="Enter campus" />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Delivery
//                 </label>
//                 <Radio.Group name="delivery" className="space-x-4">
//                   <Radio value="yes">Yes</Radio>
//                   <Radio value="no">No</Radio>
//                 </Radio.Group>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Delivery Cost (€)
//                 </label>
//                 <Input name="deliveryCost" placeholder="Enter cost" />
//               </div>
//             </div>
//           </div>

//           {/* Section: Geolocation */}
//           <div>
//             <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
//               Geolocation of the Transaction
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Campus
//                 </label>
//                 <Input
//                   name="geolocationCampus"
//                   placeholder="Enter geolocation of campus"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Country
//                 </label>
//                 <Input
//                   name="geolocationCountry"
//                   placeholder="Enter geolocation of country"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Section: Special Conditions */}
//           <div>
//             <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
//               Other Special Conditions
//             </h2>
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">
//                 Additional Description
//               </label>
//               <Input.TextArea
//                 name="specialConditions"
//                 rows={4}
//                 placeholder="Enter additional description"
//               />
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-8">
//             <button
//               type="button"
//               className="bg-gray-400 text-white px-4 py-2 rounded-md"
//               onClick={handleBack}
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default MaterialExchangeForm;

// import { useFormContext } from "../component/FormContext";

// export default function Page() {
//   const { handleBack } = useFormContext();
//   return (
//     <div>
//       <div>
//         <div>
//           <h3>Material conditions of the exchange</h3>
//         </div>
//         <div>
//           Estimated value of the exchange <input type="text" />
//         </div>
//         <div>
//           <p>
//             deposit payement of booking Yes / No if yes{" "}
//             <input type="text" id="depositpayment" />
//             <label htmlFor="depositpayment">%</label>
//           </p>
//         </div>
//         <div>
//           <p>other Contigent Coverage Required</p>
//           <textarea name="" id=""></textarea>
//         </div>
//         <div>
//           <p>money back Gurantee Yes / NO</p>
//           <p>Satisfaction or Exchanged Guarantee Yes / NO</p>
//           <label htmlFor="desiredpaymentform">
//             Desired Payement Form
//             <select name="desiredpaymentform" id="desiredpaymentform">
//               <option value="exchange with addtional sum">
//                 Exchange +/- Additional Sum
//               </option>
//               <option value="exchange with serive">
//                 Exchange +/- Benefit or Service
//               </option>
//             </select>
//           </label>
//           <label htmlFor="desiredpaymentform">
//             Desired Payement Type
//             <select name="desiredpaymenttype" id="desiredpaymenttype">
//               <option value="Handtohandexchange">Hand to hand Exchange</option>
//               <option value="Exchange payment before delivery">
//                 Exchange & Payement before Delivery
//               </option>
//               <option value="Exchange payment after delivery">
//                 Exchange & Payement after Delivery
//               </option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <h4>Delivery conditions</h4>
//           <p>Pickup Yes / No</p>
//           <p>Pickup Address </p>
//           <p>country</p>
//           <p>city</p>
//           <p>campus</p>
//         </div>
//         <div>
//           <h4>Delivery</h4>
//           <p>
//             Delivery YES-NO (if yes) Delivery costs YES-NO (If yes), what is the
//             amount: €.....................
//           </p>
//         </div>
//       </div>
//       <div>
//         <p>Geolocation of the transaction</p>
//         <p>Geolocation of the Campus Country Offer</p>
//       </div>
//       <div>
//         other special conditions
//         <p>Additional description of the payment or delivery methods</p>
//       </div>
//       <button onClick={handleBack}>back</button>
//     </div>
//   );
// }

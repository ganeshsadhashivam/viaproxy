"use client";

import React from "react";
import { Formik, Form } from "formik";
import { Input, Radio, Select, DatePicker, Button } from "formik-antd";
import { useFormContext } from "./FormContext";

const SubmitExchangeForm = () => {
  const { formData, setFormData, handleNext } = useFormContext();

  // Handle changes for the "Yes" or "No" decision
  const handleDecisionChange = (e) => {
    const decision = e.target.value;

    // Update the decision in FormContext
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

  // Handle changes for the percentage input
  const handlePercentageChange = (e) => {
    const percentage = e.target.value;

    // Update the percentage in FormContext
    setFormData((prev) => ({
      ...prev,
      materialConditions: {
        ...prev.materialConditions,
        percentage,
      },
    }));
  };

  // Handle pickup and delivery logic
  const handlePickupChange = (e) => {
    const pickup = e.target.value;
    setFormData((prev) => ({
      ...prev,
      deliveryConditions: {
        ...prev.deliveryConditions,
        pickup,
        pickupDetails:
          pickup === "no" ? {} : prev.deliveryConditions?.pickupDetails || {},
      },
    }));
  };

  const handleDeliveryChange = (e) => {
    const delivery = e.target.value;
    setFormData((prev) => ({
      ...prev,
      deliveryConditions: {
        ...prev.deliveryConditions,
        delivery,
        deliveryCost:
          delivery === "no" ? "" : prev.deliveryConditions?.deliveryCost || "",
      },
    }));
  };

  return (
    <Formik
      initialValues={{
        ...formData.proposedOffer,
        ...formData.materialConditions,
        ...formData.deliveryConditions,
      }}
      //   onSubmit={(values) => {
      //     setFormData((prev) => ({
      //       ...prev,
      //       proposedOffer: {
      //         ...values, // Only update proposedOffer fields
      //       },
      //       materialConditions: {
      //         ...values, // Only update materialConditions fields
      //       },
      //       deliveryConditions: {
      //         ...values, // Only update deliveryConditions fields
      //       },
      //     }));
      //     handleNext();
      //   }}
      onSubmit={(values) => {
        // Combine all sections of form data
        const collectedData = {
          proposedOffer: {
            ...formData.proposedOffer,
            ...values, // Updates only proposed offer fields
          },
          materialConditions: {
            ...formData.materialConditions,
            ...values, // Updates material conditions fields
          },
          deliveryConditions: {
            ...formData.deliveryConditions,
            ...values, // Updates delivery conditions fields
          },
        };

        console.log("Collected Form Data:", collectedData);

        // Optionally set formData to update context state
        setFormData(collectedData);

        // Proceed to the next step
        handleNext();
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div className="bg-gray-100 p-4 ">
            <div className="text-center">
              <h2 className="text-xl font-bold">Submit an Exchange Offer</h2>
              <h3>
                Finace your projects or expenses with your unused serives or
                goods!
              </h3>
              <div className="bg-white p-2 mt-1 mb-1">
                <p>Zone 1 Insertion Banner Advertising</p>
              </div>
              <div className="bg-white p-2 mt-5 mb-2">
                <p>Details of the proposed offer</p>
                <p>Detail as precisely as possible what you offer</p>
              </div>
            </div>
            <div>
              <label>Title of the Offer</label>
              <Input name="title" placeholder="Enter title" />
            </div>

            <div className="flex flex-row justify-evenly mt-3 mb-3">
              <div>
                <label>What do you offer?</label>
                <Radio.Group name="offerType">
                  <Radio name="Good" value="Good">
                    A Good
                  </Radio>
                  <Radio name="Service" value="Service">
                    A Service
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="">
                <label>Category</label>
                <Select name="category" className=" w-full ">
                  <Select.Option value="Electronics">Electronics</Select.Option>
                  <Select.Option value="Health">Health</Select.Option>
                </Select>
              </div>
              <div>
                <label>SubCategory</label>
                <Select name="subcategory" className="w-full">
                  <Select.Option value="Accessories">Electronics</Select.Option>
                  <Select.Option value="Health">Health</Select.Option>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="">Featured Product Status</label>
              <Select name="featuredproductstatus" className=" w-full ">
                <Select.Option value="Nine">Nine</Select.Option>
                <Select.Option value="Almost nine">Almost nine</Select.Option>
                <Select.Option value="Very good condition">
                  Very good condition
                </Select.Option>
                <Select.Option value="Good condition">
                  Good Condition
                </Select.Option>
                <Select.Option value="Used">Used</Select.Option>
                <Select.Option value="Need for repair">
                  Need For Repair
                </Select.Option>
              </Select>
            </div>
            <div className="mt-2">
              <h3>Additional Description of your offer(images,invoices)</h3>
              <input type="file" />
            </div>
            <div className="flex justify-evenly">
              <div>
                <label>Offer Start Date</label>
                <DatePicker name="startDate" />
              </div>
              <div>
                <label>Offer End Date</label>
                <DatePicker name="endDate" />
              </div>
              <div className="">
                <label>
                  Form of Exchange
                  <Select name="formofexchange" className="w-full">
                    <Select.Option value="sale">Sale</Select.Option>
                    <Select.Option value="gift">Gift</Select.Option>
                  </Select>
                </label>
              </div>
            </div>

            {/* Material Conditions */}
            <div>
              <h2 className="text-xl font-bold text-center">
                Material conditions of the exchange
              </h2>

              {/* Deposit Payment */}
              <div>
                <p>Estimated value of the exchange</p>
                <div>
                  <label>Deposit payment for booking:</label>
                  <Radio.Group
                    name="decision"
                    value={formData.materialConditions?.decision || ""}
                    onChange={handleDecisionChange}
                  >
                    <Radio name="Depositpaymentforbooking" value="yes">
                      Yes
                    </Radio>
                    <Radio name="Depositpaymentforbooking" value="no">
                      No
                    </Radio>
                  </Radio.Group>
                </div>

                {formData.materialConditions?.decision === "yes" && (
                  <div className="mt-4">
                    <label htmlFor="percentage">
                      Please provide the deposit percentage (%):
                    </label>
                    <input
                      id="percentage"
                      type="number"
                      value={formData.materialConditions?.percentage || ""}
                      onChange={handlePercentageChange}
                      placeholder="Enter percentage"
                      className="mt-2"
                      min={0}
                      max={100}
                    />
                  </div>
                )}
              </div>

              {/* Money Back Guarantee and Satisfaction Guarantee */}
              <div>
                <label>Money Back Guarantee:</label>
                <Radio.Group name="moneyBackGuarantee">
                  <Radio name="moneyBackGuarantee" value="yes">
                    Yes
                  </Radio>
                  <Radio name="moneyBackGuarantee" value="no">
                    No
                  </Radio>
                </Radio.Group>
              </div>
              <div>
                <label>Satisfaction or Exchanged Guarantee:</label>
                <Radio.Group name="satisfactionGuarantee">
                  <Radio name="satisfactionGuarantee" value="yes">
                    Yes
                  </Radio>
                  <Radio name="satisfactionGuarantee" value="no">
                    No
                  </Radio>
                </Radio.Group>
              </div>

              {/* Desired Payment Form and Type */}
              <div>
                <label>Desired Payment Form:</label>
                <Select name="desiredPaymentForm" className="w-full">
                  <Select.Option value="exchange-sum">
                    Exchange +/- Sum
                  </Select.Option>
                  <Select.Option value="exchange-service">
                    Exchange +/- Service
                  </Select.Option>
                </Select>
              </div>
              <div>
                <label>Desired Payment Type:</label>
                <Select name="desiredPaymentType" className="w-full">
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
            <div>
              <h2 className="text-xl font-bold text-center">
                Delivery Conditions
              </h2>

              {/* Pickup */}
              <div>
                <label>Pickup:</label>
                <Radio.Group
                  name="pickup"
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
                  <div className="mt-4">
                    <label>Pickup Address:</label>
                    <Input name="pickupAddress" placeholder="Enter Address" />
                    <label>Country:</label>
                    <Input name="pickupCountry" placeholder="Enter Country" />
                    <label>City:</label>
                    <Input name="pickupCity" placeholder="Enter City" />
                    <label>Campus:</label>
                    <Input name="pickupCampus" placeholder="Enter Campus" />
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div>
                <label>Delivery:</label>
                <Radio.Group
                  name="delivery"
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
                  <div className="mt-4">
                    <label>Delivery Cost:</label>
                    <Input name="deliveryCost" placeholder="Enter Cost" />
                    <label>Country:</label>
                    <Input name="deliveryCountry" placeholder="Enter Country" />
                    <label>City:</label>
                    <Input name="deliveryCity" placeholder="Enter City" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <button type="submit">submit</button>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-sm"
              >
                Next
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitExchangeForm;

//    {/* Material conditions of Exchange */}
//    <div>
//    <h2 className="text-xl font-bold text-center">
//      Material conditions of the exchange
//    </h2>
//    <div>
//      <p>Estimated value of the exchange</p>
//      <div>
//        <label>Deposit payment for booking:</label>
//        <Radio.Group
//          name="decision"
//          value={formData.materialConditions?.decision || ""}
//          onChange={handleDecisionChange}
//        >
//          <Radio name="materialcondition" value="yes">
//            Yes
//          </Radio>
//          <Radio name="materialcondition" value="no">
//            No
//          </Radio>
//        </Radio.Group>
//      </div>

//      {/* Show percentage input if "Yes" is selected */}
//      {formData.materialConditions?.decision === "yes" && (
//        <div className="mt-4">
//          <label htmlFor="percentage">
//            Please provide the deposit percentage (%):
//          </label>
//          <Input
//            id="percentage"
//            type="number"
//            value={formData.materialConditions?.percentage || ""}
//            onChange={handlePercentageChange}
//            placeholder="Enter percentage"
//            className="mt-2"
//            min={0}
//            max={100}
//          />
//        </div>
//      )}
//    </div>
//  </div>
//  <div className="flex flex-row justify-end">
//    <button
//      className="bg-green-600 text-white p-2 rounded-sm"
//      type="submit"
//    >
//      Next
//    </button>
//  </div>

//  {/* Money Back Guarantee and Satisfaction Guarantee */}
//  <div>
//    <div>
//      <label>Money Back Guarantee:</label>
//      <Radio.Group name="moneyBackGuarantee">
//        <Radio value="yes">Yes</Radio>
//        <Radio value="no">No</Radio>
//      </Radio.Group>
//    </div>
//    <div>
//      <label>Satisfaction or Exchanged Guarantee:</label>
//      <Radio.Group name="satisfactionGuarantee">
//        <Radio value="yes">Yes</Radio>
//        <Radio value="no">No</Radio>
//      </Radio.Group>
//    </div>

//    {/* Desired Payment Form and Type */}
//    <div>
//      <label>Desired Payment Form:</label>
//      <Select name="desiredPaymentForm" className="w-full">
//        <Select.Option value="exchange-sum">
//          Exchange +/- Sum
//        </Select.Option>
//        <Select.Option value="exchange-service">
//          Exchange +/- Service
//        </Select.Option>
//      </Select>
//    </div>
//    <div>
//      <label>Desired Payment Type:</label>
//      <Select name="desiredPaymentType" className="w-full">
//        <Select.Option value="hand-to-hand">
//          Hand-to-Hand Exchange
//        </Select.Option>
//        <Select.Option value="before-delivery">
//          Payment Before Delivery
//        </Select.Option>
//        <Select.Option value="after-delivery">
//          Payment After Delivery
//        </Select.Option>
//      </Select>
//    </div>
//  </div>

//  {/* Delivery Conditions */}
//  <div>
//    <h2 className="text-xl font-bold text-center">
//      Delivery Conditions
//    </h2>

//    {/* Pickup */}
//    <div>
//      <label>Pickup:</label>
//      <Radio.Group
//        name="pickup"
//        value={formData.deliveryConditions?.pickup || ""}
//        onChange={handlePickupChange}
//      >
//        <Radio value="yes">Yes</Radio>
//        <Radio value="no">No</Radio>
//      </Radio.Group>
//      {formData.deliveryConditions?.pickup === "yes" && (
//        <div className="mt-4">
//          <label>Pickup Address:</label>
//          <Input name="pickupAddress" placeholder="Enter Address" />
//          <label>Country:</label>
//          <Input name="pickupCountry" placeholder="Enter Country" />
//          <label>City:</label>
//          <Input name="pickupCity" placeholder="Enter City" />
//          <label>Campus:</label>
//          <Input name="pickupCampus" placeholder="Enter Campus" />
//        </div>
//      )}
//    </div>

//    {/* Delivery */}
//    <div>
//      <label>Delivery:</label>
//      <Radio.Group
//        name="delivery"
//        value={formData.deliveryConditions?.delivery || ""}
//        onChange={handleDeliveryChange}
//      >
//        <Radio value="yes">Yes</Radio>
//        <Radio value="no">No</Radio>
//      </Radio.Group>
//      {formData.deliveryConditions?.delivery === "yes" && (
//        <div className="mt-4">
//          <label>Delivery Cost:</label>
//          <Input name="deliveryCost" placeholder="Enter Cost" />
//          <label>Country:</label>
//          <Input name="deliveryCountry" placeholder="Enter Country" />
//          <label>City:</label>
//          <Input name="deliveryCity" placeholder="Enter City" />
//        </div>
//      )}
//    </div>
//  </div>

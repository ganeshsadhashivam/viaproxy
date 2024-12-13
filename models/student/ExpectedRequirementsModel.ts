import mongoose, { Schema, Document } from "mongoose";

// TypeScript interface
export interface ExpectedRequirementsModel extends Document {
  title: string; // Title of the offer
  offerType: "Good" | "Service"; // Type of the offer
  category: string; // Category of the expected need
  subcategory: string; // Subcategory of the expected need
  featuredProductStatus: "New" | "GoodCondition" | "Used"; // Desired product status
  additionalDescription?: string; // Additional description of the offer
  images?: string[]; // Array of image URLs
  startDate?: Date; // Start date for the exchange
  endDate?: Date; // End date for the exchange
  formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation"; // Form of exchange
  materialConditions?: {
    estimatedValue?: number; // Estimated value of the exchange
    depositPayment?: {
      required: boolean; // Whether deposit payment is required
      percentage?: number; // Percentage of deposit required
    };
    otherContingentCoverageRequired?: string; // Contingent coverage details
    guarantees?: {
      moneyBack: boolean; // Money-back guarantee
      satisfaction: boolean; // Satisfaction or exchange guarantee
    };
  };
  paymentDetails?: {
    desiredPaymentForm?: "exchange-sum" | "exchange-service"; // Desired payment form
    desiredPaymentType?: "hand-to-hand" | "before-delivery" | "after-delivery"; // Desired payment type
  };
  deliveryConditions?: {
    pickup?: {
      allowed: boolean; // Whether pickup is allowed
      details?: {
        address?: string; // Pickup address
        country?: string; // Pickup country
        city?: string; // Pickup city
        campus?: string; // Pickup campus
      };
    };
    delivery?: {
      allowed: boolean; // Whether delivery is allowed
      details?: {
        cost?: number; // Delivery cost
        country?: string; // Delivery country
        city?: string; // Delivery city
      };
    };
  };
  geolocation?: {
    campus?: string; // Campus location for the transaction
    country?: string; // Country location for the transaction
  };
  otherSpecialConditions?: {
    description?: string; // Additional description for payment or delivery method
    uploadedFiles?: string[]; // Array of uploaded file URLs
  };
}

// Schema definition
const ExpectedRequirementsSchema: Schema<ExpectedRequirementsModel> =
  new Schema(
    {
      title: { type: String, required: true },
      offerType: { type: String, enum: ["Good", "Service"], required: true },
      category: { type: String, required: true },
      subcategory: { type: String, required: true },
      featuredProductStatus: {
        type: String,
        enum: ["New", "GoodCondition", "Used"],
        required: true,
      },
      additionalDescription: { type: String },
      images: { type: [String] },
      startDate: { type: Date },
      endDate: { type: Date },
      formOfExchange: {
        type: String,
        enum: ["Exchange", "Classic Sale", "Auction", "Donation"],
        required: true,
      },
      materialConditions: {
        estimatedValue: { type: Number },
        depositPayment: {
          required: { type: Boolean },
          percentage: { type: Number },
        },
        otherContingentCoverageRequired: { type: String },
        guarantees: {
          moneyBack: { type: Boolean },
          satisfaction: { type: Boolean },
        },
      },
      paymentDetails: {
        desiredPaymentForm: {
          type: String,
          enum: ["exchange-sum", "exchange-service"],
        },
        desiredPaymentType: {
          type: String,
          enum: ["hand-to-hand", "before-delivery", "after-delivery"],
        },
      },
      deliveryConditions: {
        pickup: {
          allowed: { type: Boolean },
          details: {
            address: { type: String },
            country: { type: String },
            city: { type: String },
            campus: { type: String },
          },
        },
        delivery: {
          allowed: { type: Boolean },
          details: {
            cost: { type: Number },
            country: { type: String },
            city: { type: String },
          },
        },
      },
      geolocation: {
        campus: { type: String },
        country: { type: String },
      },
      otherSpecialConditions: {
        description: { type: String },
        uploadedFiles: { type: [String] },
      },
    },
    {
      timestamps: false, // Set timestamps if required
    }
  );

export default mongoose.model<ExpectedRequirementsModel>(
  "ExpectedRequirements",
  ExpectedRequirementsSchema
);

// import { Schema } from "mongoose";

// export interface ExpectedRequirementsModel {
//   title: string; // Title of the offer
//   offerType: "Good" | "Service"; // Type of the offer
//   category: string; // Category of the expected need
//   subcategory: string; // Subcategory of the expected need
//   featuredProductStatus: "New" | "GoodCondition" | "Used"; // Desired product status
//   additionalDescription?: string; // Additional description of the offer
//   images?: string[]; // Array of image URLs
//   startDate?: Date; // Start date for the exchange
//   endDate?: Date; // End date for the exchange
//   formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation"; // Form of exchange
//   materialConditions?: {
//     estimatedValue?: number; // Estimated value of the exchange
//     depositPayment?: {
//       required: boolean; // Whether deposit payment is required
//       percentage?: number; // Percentage of deposit required
//     };
//     otherContingentCoverageRequired?: string; // Contingent coverage details
//     guarantees?: {
//       moneyBack: boolean; // Money-back guarantee
//       satisfaction: boolean; // Satisfaction or exchange guarantee
//     };
//   };
//   paymentDetails?: {
//     desiredPaymentForm?: "exchange-sum" | "exchange-service"; // Desired payment form
//     desiredPaymentType?: "hand-to-hand" | "before-delivery" | "after-delivery"; // Desired payment type
//   };
//   deliveryConditions?: {
//     pickup?: {
//       allowed: boolean; // Whether pickup is allowed
//       details?: {
//         address?: string; // Pickup address
//         country?: string; // Pickup country
//         city?: string; // Pickup city
//         campus?: string; // Pickup campus
//       };
//     };
//     delivery?: {
//       allowed: boolean; // Whether delivery is allowed
//       details?: {
//         cost?: number; // Delivery cost
//         country?: string; // Delivery country
//         city?: string; // Delivery city
//       };
//     };
//   };
//   geolocation?: {
//     campus?: string; // Campus location for the transaction
//     country?: string; // Country location for the transaction
//   };
//   otherSpecialConditions?: {
//     description?: string; // Additional description for payment or delivery method
//     uploadedFiles?: string[]; // Array of uploaded file URLs
//   };
// }

// // Schema for ExpectedRequirementsModel
// const ExpectedRequirementsSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   offerType: { type: String, enum: ["Good", "Service"], required: true },
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   featuredProductStatus: {
//     type: String,
//     enum: ["New", "GoodCondition", "Used"],
//     required: true,
//   },
//   additionalDescription: { type: String },
//   images: { type: [String] },
//   startDate: { type: Date },
//   endDate: { type: Date },
//   formOfExchange: {
//     type: String,
//     enum: ["Exchange", "Classic Sale", "Auction", "Donation"],
//     required: true,
//   },
//   materialConditions: {
//     estimatedValue: { type: Number },
//     depositPayment: {
//       required: { type: Boolean },
//       percentage: { type: Number },
//     },
//     otherContingentCoverageRequired: { type: String },
//     guarantees: {
//       moneyBack: { type: Boolean },
//       satisfaction: { type: Boolean },
//     },
//   },
//   paymentDetails: {
//     desiredPaymentForm: {
//       type: String,
//       enum: ["exchange-sum", "exchange-service"],
//     },
//     desiredPaymentType: {
//       type: String,
//       enum: ["hand-to-hand", "before-delivery", "after-delivery"],
//     },
//   },
//   deliveryConditions: {
//     pickup: {
//       allowed: { type: Boolean },
//       details: {
//         address: { type: String },
//         country: { type: String },
//         city: { type: String },
//         campus: { type: String },
//       },
//     },
//     delivery: {
//       allowed: { type: Boolean },
//       details: {
//         cost: { type: Number },
//         country: { type: String },
//         city: { type: String },
//       },
//     },
//   },
//   geolocation: {
//     campus: { type: String },
//     country: { type: String },
//   },
//   otherSpecialConditions: {
//     description: { type: String },
//     uploadedFiles: { type: [String] },
//   },
// });

// export default ExpectedRequirementsSchema;

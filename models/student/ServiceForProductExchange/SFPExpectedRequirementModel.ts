import mongoose, { Schema, Document } from "mongoose";

// TypeScript interface
export interface SFPExpectedRequirementsModel extends Document {
  zoneOneBanner: string;
  title: string;
  offerType: "Good" | "Service";
  category: string;
  subcategory: string;
  featuredProductStatus: "New" | "GoodCondition" | "Used";
  additionalDescription?: string;
  images?: string[];
  startDate?: Date;
  endDate?: Date;
  formOfExchange: "Exchange" | "Classic Sale" | "Auction" | "Donation";
  materialConditions?: {
    estimatedValue?: number;
    depositPayment?: {
      decision?: "yes" | "no"; // Add decision to the interface
      percentage?: number | null; // Allow percentage to be optional
    };
    otherContingentCoverageRequired?: string;
  };
  guarantees?: {
    moneyBack: boolean;
    satisfaction: boolean;
  };
  paymentDetails?: {
    desiredPaymentForm?: "exchange-sum" | "exchange-service";
    desiredPaymentType?: "hand-to-hand" | "before-delivery" | "after-delivery";
  };
  deliveryConditions?: {
    pickup?: {
      allowed: boolean;
      details?: {
        address?: string;
        country?: string;
        city?: string;
        campus?: string;
      };
    };
    delivery?: {
      allowed: boolean;
      details?: {
        cost?: number;
        country?: string;
        city?: string;
      };
    };
  };
  geolocation?: {
    campus?: string;
    country?: string;
  };
  otherSpecialConditions?: {
    description?: string;
    uploadedFiles?: string[];
  };
}

// Schema definition
const SFPExpectedRequirementsSchema: Schema<SFPExpectedRequirementsModel> =
  new Schema(
    {
      zoneOneBanner: { type: String, required: true },
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
          decision: {
            type: String,
            enum: ["yes", "no"],
          },
          percentage: {
            type: Number,
            set: function (value: any) {
              // Convert "undefined" or empty string to null
              if (value === "undefined" || value === "") return null;
              return Number(value); // Convert valid strings to numbers
            },
            required: function (this: { decision: string }) {
              // percentage is required only if decision is "yes"
              return this.decision === "yes";
            },
            validate: {
              validator: function (value: number | null) {
                const decision = (this as any).decision; // Access decision from context
                if (decision === "yes") {
                  // If decision is "yes", percentage must be a valid number
                  return typeof value === "number" && !isNaN(value);
                }
                if (decision === "no") {
                  // If decision is "no", percentage must be null or undefined
                  return value === null || value === undefined;
                }
                return true; // Allow other cases
              },
              message:
                "percentage must be a valid number when decision is 'yes' or null when 'no'.",
            },
          },
        },

        otherContingentCoverageRequired: { type: String },
      },

      guarantees: {
        moneyBack: { type: Boolean },
        satisfaction: { type: Boolean },
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
      timestamps: false, // Disable timestamps for this schema
    }
  );

// Export the schema and the model separately
export { SFPExpectedRequirementsSchema };

const SFPExpectedRequirementModel =
  mongoose.models.SFPSubmitExchangeSchema ||
  mongoose.model(
    "SFPExpectedRequirementsSchema",
    SFPExpectedRequirementsSchema
  );

export default SFPExpectedRequirementModel;

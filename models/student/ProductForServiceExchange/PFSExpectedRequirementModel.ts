import mongoose, { Schema } from "mongoose";

// Define the interface for the schema
interface FreeQuote extends Document {
  freeQuote: "yes" | "no" | "";
  feeAmount: number | null | undefined;
}

// Define the schema
const PFSExpectedRequirementsSchema = new Schema({
  title: { type: String, required: true },
  offerType: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  featuredProductStatus: {
    type: String,
    enum: ["New", "GoodCondition", "Used", ""],
    required: true,
  },
  additionalDescription: { type: String, required: true },
  images: [{ type: String }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  materialConditions: {
    hourlyRate: { type: Number, required: true },
    minimumBenefit: { type: Number, required: true },
    packageRequested: { type: Number, required: true },
    // travelExpenses: {
    //   isRequired: { type: String, enum: ["yes", "no", null], required: true },
    //   feeAmount: {
    //     type: Number,
    //     required: function (this: { isRequired: string }) {
    //       return this.isRequired === "yes";
    //     },
    //   },
    // },
    // freeQuote: {
    //   freeQuote: { type: String, enum: ["yes", "no", ""], required: true },
    //   feeAmount: {
    //     type: Number,
    //     required: function (this: { freeQuote: string }) {
    //       return this.freeQuote === "no";
    //     },
    //   },
    // },
    travelExpenses: {
      isRequired: { type: String, enum: ["yes", "no", null], required: true },
      feeAmount: {
        type: Number,
        set: function (value: any) {
          // Convert the string "null" to an actual null value
          if (value === "null" || value === "") return null;
          return Number(value); // Convert other values to numbers
        },
        required: function (this: { isRequired: string }) {
          // feeAmount is required only if isRequired is "yes"
          return this.isRequired === "yes";
        },
        validate: {
          validator: function (value: number | null) {
            const isRequired = (this as any).isRequired; // Explicitly cast 'this' to 'any'
            if (isRequired === "yes") {
              // If isRequired is "yes", feeAmount must be a valid number
              return typeof value === "number" && !isNaN(value);
            }
            if (isRequired === "no") {
              // If isRequired is "no", feeAmount must be null
              return value === null;
            }
            return true; // Allow other cases
          },
          message:
            "feeAmount must be null when isRequired is 'no', or a number when 'yes'.",
        },
      },
    },

    freeQuote: {
      freeQuote: {
        type: String,
        enum: ["yes", "no", ""],
      },
      feeAmount: {
        type: Number,
        set: function (value: any) {
          // Convert "undefined" string to actual undefined or parse the number
          if (value === "undefined") return undefined;
          return Number(value);
        },
        required: function (this: any) {
          // Ensure feeAmount is required only if freeQuote is "no"
          return this.freeQuote === "no";
        },
        default: function (this: any) {
          // Default to null if freeQuote is "yes" or ""
          return this.freeQuote === "yes" || this.freeQuote === ""
            ? null
            : undefined;
        },
        // validate: {
        //   validator: function (value: number | null | undefined) {
        //     const freeQuoteValue = (this as any).freeQuote; // Access freeQuote safely
        //     if (freeQuoteValue === "no") {
        //       return typeof value === "number" && !isNaN(value);
        //     }
        //     return value === null || value === undefined;
        //   },
        //   message: "feeAmount must be a number when freeQuote is 'no'.",
        // },
        validate: {
          validator: function (value: number | null) {
            const isRequired = (this as any).isRequired; // Explicitly cast 'this' to 'any'
            if (isRequired === "yes") {
              // If isRequired is "yes", feeAmount must be a valid number
              return typeof value === "number" && !isNaN(value);
            }
            if (isRequired === "no") {
              // If isRequired is "no", feeAmount must be null
              return value === null;
            }
            return true; // Allow other cases
          },
          message:
            "feeAmount must be null when isRequired is 'no', or a number when 'yes'.",
        },
      },
    },
    // freeQuote: {
    //   type: String,
    //   enum: ["yes", "no", ""],
    // },
    // feeAmount: {
    //   type: Number,
    //   set: function (value: any) {
    //     if (value === "" || value === "undefined") return undefined;
    //     return Number(value);
    //   },
    // },

    // otherPossibleCost: {
    //   otherPossibleCost: {
    //     type: String,
    //     enum: ["yes", "no", ""],
    //     required: true,
    //   },
    //   amountOfCost: { type: Number },
    //   natureOfTheseCost: { type: String },
    // },
    otherPossibleCost: {
      otherPossibleCost: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      amountOfCost: {
        type: Number,
        set: function (value: any) {
          // Convert "null" string to actual null
          if (value === "null" || value === "") return null;
          return Number(value); // Convert valid strings to numbers
        },
        required: function (this: any) {
          // Ensure 'amountOfCost' is required only if 'otherPossibleCost' is "yes"
          return this.otherPossibleCost === "yes";
        },
        validate: {
          validator: function (value: number | null) {
            const otherPossibleCost = (this as any).otherPossibleCost; // Explicitly cast 'this'
            if (otherPossibleCost === "yes") {
              // If otherPossibleCost is "yes", amountOfCost must be a valid number
              return typeof value === "number" && !isNaN(value);
            }
            return true; // No validation for other cases
          },
          message:
            "amountOfCost must be a valid number when otherPossibleCost is 'yes'.",
        },
      },
      natureOfTheseCost: {
        type: String,
        required: function (this: any) {
          // Ensure 'natureOfTheseCost' is required only if 'otherPossibleCost' is "yes"
          return this.otherPossibleCost === "yes";
        },
        validate: {
          validator: function (value: string) {
            const otherPossibleCost = (this as any).otherPossibleCost; // Explicitly cast 'this'
            if (otherPossibleCost === "yes") {
              // If otherPossibleCost is "yes", natureOfTheseCost must not be empty
              return value.trim().length > 0;
            }
            return true; // No validation for other cases
          },
          message:
            "natureOfTheseCost must be a non-empty string when otherPossibleCost is 'yes'.",
        },
      },
    },
    contingentWarranty: { type: String, required: true },
    guarantees: {
      moneyBackGuarantee: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      satisfactionGuarantee: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
    },
    estimatedValue: { type: String, required: true },
    depositPayment: {
      decision: { type: String, enum: ["yes", "no", ""], required: true },
      percentage: {
        type: String,
        required: function (this: { decision: string }) {
          return this.decision === "yes";
        },
      },
    },
    otherContingentCoverageRequired: { type: String, required: true },
    paymentDetails: {
      desiredPaymentForm: {
        type: String,
        enum: ["exchange-sum", "exchange-service", ""],
        required: true,
      },
      desiredPaymentType: {
        type: String,
        enum: ["hand-to-hand", "before-delivery", "after-delivery", ""],
        required: true,
      },
    },
  },
  deliveryConditions: {
    pickup: {
      allowed: { type: String, enum: ["yes", "no", null], required: true },
      details: {
        address: { type: String },
        country: { type: String },
        city: { type: String },
        campus: { type: String },
      },
    },
    // delivery: {
    //   allowed: { type: String, enum: ["yes", "no", null], required: true },
    //   costOption: { type: String, enum: ["yes", "no", null] },
    //   details: {
    //     amount: { type: String },
    //     country: { type: String },
    //     city: { type: String },
    //   },
    // },
    delivery: {
      allowed: {
        type: String,
        enum: ["yes", "no", null],
        required: true,
      },
      costOption: {
        type: String,
        enum: ["yes", "no", null],
        set: function (value: any) {
          // Convert "null" string to actual null
          if (value === "null" || value === "") return null;
          return value;
        },
      },
      details: {
        type: new Schema(
          {
            amount: {
              type: String,
              required: function (this: { allowed: string }) {
                // 'amount' is required only if 'allowed' is "yes"
                return this.allowed === "yes";
              },
            },
            country: {
              type: String,
              required: function (this: { allowed: string }) {
                // 'country' is required only if 'allowed' is "yes"
                return this.allowed === "yes";
              },
            },
            city: {
              type: String,
              required: function (this: { allowed: string }) {
                // 'city' is required only if 'allowed' is "yes"
                return this.allowed === "yes";
              },
            },
          },
          { _id: false } // Prevent Mongoose from creating an _id field for nested schema
        ),
        required: true, // 'details' object is always required
      },
    },
  },
  geolocation: {
    campus: { type: String, required: true },
    country: { type: String, required: true },
  },
  otherSpecialConditions: {
    additionalDescription: { type: String, required: true },
    uploadedFiles: [{ type: String }],
  },
});

// Export the schema and the model separately
export { PFSExpectedRequirementsSchema }; // Schema export

const PFSExpectedRequirementsModel =
  mongoose.models.PFSExpectedRequirements ||
  mongoose.model("PFSExpectedRequirements", PFSExpectedRequirementsSchema);

export default PFSExpectedRequirementsModel;

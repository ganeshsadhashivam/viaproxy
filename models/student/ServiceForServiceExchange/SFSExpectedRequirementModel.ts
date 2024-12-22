import mongoose, { Schema, Document } from "mongoose";

interface OtherPossibleCost {
  otherPossibleCost: "yes" | "no" | ""; // Valid values for otherPossibleCost
  amountOfCost?: number | null; // Optional, number or null
  natureOfTheseCost: string; // Required nature description
}

interface MaterialConditions {
  hourlyRate: number;
  minimumBenefit: number;
  packageRequested: number;
  travelExpenses: {
    isRequired: "yes" | "no" | null;
    feeAmount: number;
  };
  freeQuote: {
    freeQuote: "yes" | "no" | "";
    feeAmount?: number | null;
  };
  otherPossibleCost: OtherPossibleCost;
  contingentWarranty: string;
  guarantees: {
    moneyBackGuarantee: "yes" | "no" | "";
    satisfactionGuarantee: "yes" | "no" | "";
  };
  estimatedValue: string;
  depositPayment: {
    decision: "yes" | "no" | "";
    percentage: string;
  };
  otherContingentCoverageRequired: string;
  paymentDetails: {
    desiredPaymentForm: "exchange-sum" | "exchange-service" | "";
    desiredPaymentType:
      | "hand-to-hand"
      | "before-delivery"
      | "after-delivery"
      | "";
  };
}

interface SFSExpectedRequirements extends Document {
  title: string;
  offerType: string;
  category: string;
  subcategory: string;
  featuredProductStatus: "New" | "GoodCondition" | "Used" | "";
  additionalDescription: string;
  images: string[];
  startDate: string;
  endDate: string;
  materialConditions: MaterialConditions;
  deliveryConditions: {
    pickup: {
      allowed: "yes" | "no" | null;
      details: {
        address: string;
        country: string;
        city: string;
        campus: string;
      };
    };
    delivery: {
      allowed: "yes" | "no" | null;
      costOption: "yes" | "no" | null;
      details: {
        amount: string;
        country: string;
        city: string;
      };
    };
  };
  geolocation: {
    campus: string;
    country: string;
  };
  otherSpecialConditions: {
    additionalDescription: string;
    uploadedFiles: string[];
  };
}

// Define the schema
const SFSExpectedRequirementsSchema = new Schema<SFSExpectedRequirements>({
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
    travelExpenses: {
      isRequired: { type: String, enum: ["yes", "no", null], required: true },
      feeAmount: {
        type: Number,
        required: function (this: { isRequired: string }) {
          return this.isRequired === "yes";
        },
      },
    },
    freeQuote: {
      freeQuote: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      feeAmount: {
        type: Number,
        // Set function to handle the condition when freeQuote is 'yes' or 'no'
        set: function (this: SFSExpectedRequirements, value: any) {
          // Check if the value is a string "undefined" and treat it as undefined
          if (value === "undefined") {
            return undefined; // Treat "undefined" string as actual undefined
          }

          // If freeQuote is 'yes', set feeAmount to undefined (null or undefined)
          if (this.materialConditions.freeQuote.freeQuote === "yes") {
            return undefined;
          }

          // If freeQuote is 'no', ensure feeAmount is a valid number
          if (this.materialConditions.freeQuote.freeQuote === "no") {
            return isNaN(value) ? undefined : value; // Only valid number
          }

          return value; // For other cases, return the value as is
        },
        required: function (this: SFSExpectedRequirements) {
          // Make feeAmount required only when freeQuote is 'no'
          return this.materialConditions.freeQuote.freeQuote === "no";
        },
        default: function (this: SFSExpectedRequirements): null | undefined {
          // Default to null if freeQuote is 'yes' or ''
          return this.materialConditions.freeQuote.freeQuote === "yes" ||
            this.materialConditions.freeQuote.freeQuote === ""
            ? null
            : undefined;
        },
        validate: {
          validator: function (
            this: SFSExpectedRequirements,
            value: number | null | undefined
          ) {
            const freeQuoteValue = this.materialConditions.freeQuote.freeQuote;
            if (freeQuoteValue === "no") {
              // If freeQuote is 'no', validate that feeAmount is a valid number
              return typeof value === "number" && !isNaN(value);
            }
            // If freeQuote is 'yes', feeAmount must be null or undefined
            return value === null || value === undefined;
          },
          message: "feeAmount must be a number when freeQuote is 'no'.",
        },
      },
    },
    otherPossibleCost: {
      otherPossibleCost: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      amountOfCost: {
        type: Number,
        set: function (value: any): number | null {
          if (value === "null" || value === null) {
            return null; // Convert 'null' string to actual null
          }
          if (typeof value === "string") {
            const numberValue = Number(value);
            return isNaN(numberValue) ? null : numberValue; // Convert to number if valid
          }
          return value; // Return the value as is if it's already a valid number
        },
      },
      natureOfTheseCost: { type: String, required: true },
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
    delivery: {
      allowed: { type: String, enum: ["yes", "no", null], required: true },
      costOption: { type: String, enum: ["yes", "no", null] },
      details: {
        amount: { type: String },
        country: { type: String },
        city: { type: String },
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
export { SFSExpectedRequirementsSchema };

const SFSExpectedRequirementsModel =
  mongoose.models.SFSExpectedRequirements ||
  mongoose.model("SFSExpectedRequirements", SFSExpectedRequirementsSchema);

export default SFSExpectedRequirementsModel;

// import mongoose, { Schema } from "mongoose";

// // Define types for the schema fields
// // interface FreeQuote {
// //   freeQuote: "yes" | "no" | "";
// //   feeAmount: null | undefined | string;
// // }

// interface FreeQuote {
//   freeQuote: "yes" | "no" | ""; // Valid values for freeQuote
//   feeAmount?: number | null; // feeAmount is required only when freeQuote is "no"
// }

// interface ExpectedRequirements extends Document {
//   freeQuote: FreeQuote;
// }

// // Define the schema
// const SFSExpectedRequirementsSchema = new Schema({
//   title: { type: String, required: true },
//   offerType: { type: String, required: true },
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   featuredProductStatus: {
//     type: String,
//     enum: ["New", "GoodCondition", "Used", ""],
//     required: true,
//   },
//   additionalDescription: { type: String, required: true },
//   images: [{ type: String }],
//   startDate: { type: String, required: true },
//   endDate: { type: String, required: true },
//   materialConditions: {
//     hourlyRate: { type: Number, required: true },
//     minimumBenefit: { type: Number, required: true },
//     packageRequested: { type: Number, required: true },
//     travelExpenses: {
//       isRequired: { type: String, enum: ["yes", "no", null], required: true },
//       feeAmount: {
//         type: Number,
//         required: function (this: { isRequired: string }) {
//           return this.isRequired === "yes";
//         },
//       },
//     },
//     // freeQuote: {
//     //   freeQuote: { type: String, enum: ["yes", "no", ""], required: true },
//     //   feeAmount: {
//     //     type: Number,
//     //     required: function (this: { freeQuote: string }) {
//     //       return this.freeQuote === "no";
//     //     },
//     //   },
//     // },
//     //worked pfs
//     // freeQuote: {
//     //   freeQuote: {
//     //     type: String,
//     //     enum: ["yes", "no", ""],
//     //     required: true,
//     //   },
//     //   feeAmount: {
//     //     type: Number,
//     //     set: function (value: any) {
//     //       // Convert "undefined" string to actual undefined or parse the number
//     //       if (value === "undefined") return undefined;
//     //       return Number(value);
//     //     },
//     //     required: function (this: any) {
//     //       // Ensure feeAmount is required only if freeQuote is "no"
//     //       return this.freeQuote === "no";
//     //     },
//     //     default: function (this: any) {
//     //       // Default to null if freeQuote is "yes" or ""
//     //       return this.freeQuote === "yes" || this.freeQuote === ""
//     //         ? null
//     //         : undefined;
//     //     },
//     //     validate: {
//     //       validator: function (value: number | null | undefined) {
//     //         const freeQuoteValue = (this as any).freeQuote; // Access freeQuote safely
//     //         if (freeQuoteValue === "no") {
//     //           return typeof value === "number" && !isNaN(value);
//     //         }
//     //         return value === null || value === undefined;
//     //       },
//     //       message: "feeAmount must be a number when freeQuote is 'no'.",
//     //     },
//     //   },
//     // },
//     freeQuote: {
//       freeQuote: {
//         type: String,
//         enum: ["yes", "no", ""],
//         required: true,
//       },
//       feeAmount: {
//         type: Number, // Store feeAmount as a number
//         // Set function to handle the condition when freeQuote is 'yes' or 'no'
//         set: function (
//           this: ExpectedRequirements,
//           value: any
//         ): number | null | undefined {
//           if (this.freeQuote.freeQuote === "yes") {
//             // If freeQuote is 'yes', set feeAmount to undefined (null or undefined)
//             return undefined;
//           }

//           // If freeQuote is 'no', ensure feeAmount is a valid number
//           if (this.freeQuote.freeQuote === "no") {
//             return isNaN(value) ? undefined : value; // Only valid number
//           }

//           return value; // For other cases, return the value as is
//         },
//         required: function (this: ExpectedRequirements): boolean {
//           // Make feeAmount required only when freeQuote is 'no'
//           return this.freeQuote.freeQuote === "no";
//         },
//         default: function (this: ExpectedRequirements): null | undefined {
//           // Default to null if freeQuote is 'yes' or ''
//           return this.freeQuote.freeQuote === "yes" ||
//             this.freeQuote.freeQuote === ""
//             ? null
//             : undefined;
//         },
//         validate: {
//           validator: function (
//             this: ExpectedRequirements,
//             value: number | null | undefined
//           ): boolean {
//             const freeQuoteValue = this.freeQuote.freeQuote;

//             // If freeQuote is 'no', validate that feeAmount is a number
//             if (freeQuoteValue === "no") {
//               return typeof value === "number" && !isNaN(value);
//             }

//             // If freeQuote is 'yes', feeAmount must be null or undefined
//             if (freeQuoteValue === "yes") {
//               return value === null || value === undefined;
//             }

//             // If freeQuote is '', feeAmount must be null or undefined
//             return value === null || value === undefined;
//           },
//           message: "feeAmount must be a number when freeQuote is 'no'.",
//         },
//       },
//     },
//     otherPossibleCost: {
//       otherPossibleCost: {
//         type: String,
//         enum: ["yes", "no", ""],
//         required: true,
//       },
//       amountOfCost: { type: Number },
//       natureOfTheseCost: { type: String },
//     },
//     contingentWarranty: { type: String, required: true },
//     guarantees: {
//       moneyBackGuarantee: {
//         type: String,
//         enum: ["yes", "no", ""],
//         required: true,
//       },
//       satisfactionGuarantee: {
//         type: String,
//         enum: ["yes", "no", ""],
//         required: true,
//       },
//     },
//     estimatedValue: { type: String, required: true },
//     depositPayment: {
//       decision: { type: String, enum: ["yes", "no", ""], required: true },
//       percentage: {
//         type: String,
//         required: function (this: { decision: string }) {
//           return this.decision === "yes";
//         },
//       },
//     },
//     otherContingentCoverageRequired: { type: String, required: true },
//     paymentDetails: {
//       desiredPaymentForm: {
//         type: String,
//         enum: ["exchange-sum", "exchange-service", ""],
//         required: true,
//       },
//       desiredPaymentType: {
//         type: String,
//         enum: ["hand-to-hand", "before-delivery", "after-delivery", ""],
//         required: true,
//       },
//     },
//   },
//   deliveryConditions: {
//     pickup: {
//       allowed: { type: String, enum: ["yes", "no", null], required: true },
//       details: {
//         address: { type: String },
//         country: { type: String },
//         city: { type: String },
//         campus: { type: String },
//       },
//     },
//     delivery: {
//       allowed: { type: String, enum: ["yes", "no", null], required: true },
//       costOption: { type: String, enum: ["yes", "no", null] },
//       details: {
//         amount: { type: String },
//         country: { type: String },
//         city: { type: String },
//       },
//     },
//   },
//   geolocation: {
//     campus: { type: String, required: true },
//     country: { type: String, required: true },
//   },
//   otherSpecialConditions: {
//     additionalDescription: { type: String, required: true },
//     uploadedFiles: [{ type: String }],
//   },
// });

// // Export the schema and the model separately
// export { SFSExpectedRequirementsSchema }; // Schema export

// const SFSExpectedRequirementsModel =
//   mongoose.models.SFSExpectedRequirements ||
//   mongoose.model("SFSExpectedRequirements", SFSExpectedRequirementsSchema);

// export default SFSExpectedRequirementsModel;

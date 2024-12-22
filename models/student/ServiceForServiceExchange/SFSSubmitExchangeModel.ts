import mongoose, { Schema, Document } from "mongoose";

// Define the types for the schema fields
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
    freeQuote: "yes" | "no" | ""; // Valid values for freeQuote
    feeAmount?: number | null; // Optional feeAmount, required only when freeQuote is "no"
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

interface SFSSubmitExchangeSchemaInterface extends Document {
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
const SFSSubmitExchangeSchema = new Schema<SFSSubmitExchangeSchemaInterface>({
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
    // freeQuote: {
    //   freeQuote: {
    //     type: String,
    //     enum: ["yes", "no", ""],
    //     required: true,
    //   },
    //   feeAmount: {
    //     type: Number,
    //     set: function (
    //       this: SFSSubmitExchangeSchemaInterface,
    //       value: any
    //     ): number | null | undefined {
    //       if (this.materialConditions.freeQuote.freeQuote === "yes") {
    //         return undefined; // If freeQuote is 'yes', set feeAmount to undefined
    //       }
    //       if (this.materialConditions.freeQuote.freeQuote === "no") {
    //         return isNaN(value) ? undefined : value; // Ensure feeAmount is a valid number
    //       }
    //       return value; // For other cases, return the value as is
    //     },
    //     required: function (this: SFSSubmitExchangeSchemaInterface): boolean {
    //       return this.materialConditions.freeQuote.freeQuote === "no";
    //     },
    //     default: function (
    //       this: SFSSubmitExchangeSchemaInterface
    //     ): null | undefined {
    //       return this.materialConditions.freeQuote.freeQuote === "yes" ||
    //         this.materialConditions.freeQuote.freeQuote === ""
    //         ? null
    //         : undefined;
    //     },
    //     validate: {
    //       validator: function (
    //         this: SFSSubmitExchangeSchemaInterface,
    //         value: number | null | undefined
    //       ): boolean {
    //         const freeQuoteValue = this.materialConditions.freeQuote.freeQuote;
    //         if (freeQuoteValue === "no") {
    //           return typeof value === "number" && !isNaN(value);
    //         }
    //         return value === null || value === undefined;
    //       },
    //       message: "feeAmount must be a number when freeQuote is 'no'.",
    //     },
    //   },
    // },
    freeQuote: {
      freeQuote: {
        type: String,
        enum: ["yes", "no", ""],
        required: true,
      },
      feeAmount: {
        type: Number, // Store feeAmount as a number
        set: function (value: any) {
          if (value === "undefined" || value === "") {
            // If feeAmount is 'undefined' (as a string) or an empty string, return undefined
            return undefined;
          }
          // Else, parse as number
          return isNaN(Number(value)) ? undefined : Number(value);
        },
        required: function (this: any) {
          // Make feeAmount required only when freeQuote is 'no'
          return this.freeQuote === "no";
        },
        validate: {
          validator: function (value: any) {
            const freeQuoteValue = this.materialConditions.freeQuote;
            // If freeQuote is 'no', feeAmount must be a valid number
            if (freeQuoteValue.freeQuote === "no") {
              return typeof value === "number" && !isNaN(value);
            }
            // If freeQuote is 'yes', feeAmount must be undefined or null
            return value === undefined || value === null;
          },
          message: "feeAmount must be a valid number when freeQuote is 'no'.",
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
          // Convert string 'null' to actual null value
          if (value === "null" || value === null) {
            return null;
          }
          return value;
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
export { SFSSubmitExchangeSchema };

const SFSSubmitExchangeModel =
  mongoose.models.SFSSubmitExchangeSchema ||
  mongoose.model("SFSSubmitExchangeSchema", SFSSubmitExchangeSchema);

export default SFSSubmitExchangeModel;

// import mongoose, { Schema, Document } from "mongoose";

// // Define types for the schema fields
// interface FreeQuote {
//   freeQuote: "yes" | "no" | ""; // Valid values for freeQuote
//   feeAmount?: number | null; // feeAmount is required only when freeQuote is "no"
// }

// interface OtherPossibleCost {
//   otherPossibleCost: "yes" | "no" | ""; // Valid values for otherPossibleCost
//   amountOfCost?: number | null; // Optional, number or null
//   natureOfTheseCost: string; // Required nature description
// }

// interface MaterialConditions {
//   hourlyRate: number;
//   minimumBenefit: number;
//   packageRequested: number;
//   travelExpenses: {
//     isRequired: "yes" | "no" | null;
//     feeAmount: number;
//   };
//   freeQuote: FreeQuote;
//   otherPossibleCost: OtherPossibleCost;
//   contingentWarranty: string;
//   guarantees: {
//     moneyBackGuarantee: "yes" | "no" | "";
//     satisfactionGuarantee: "yes" | "no" | "";
//   };
//   estimatedValue: string;
//   depositPayment: {
//     decision: "yes" | "no" | "";
//     percentage: string;
//   };
//   otherContingentCoverageRequired: string;
//   paymentDetails: {
//     desiredPaymentForm: "exchange-sum" | "exchange-service" | "";
//     desiredPaymentType:
//       | "hand-to-hand"
//       | "before-delivery"
//       | "after-delivery"
//       | "";
//   };
// }

// interface SFSSubmitExchangeSchemaInterface extends Document {
//   title: string;
//   offerType: string;
//   category: string;
//   subcategory: string;
//   featuredProductStatus: "New" | "GoodCondition" | "Used" | "";
//   additionalDescription: string;
//   images: string[];
//   startDate: string;
//   endDate: string;
//   materialConditions: MaterialConditions;
//   deliveryConditions: {
//     pickup: {
//       allowed: "yes" | "no" | null;
//       details: {
//         address: string;
//         country: string;
//         city: string;
//         campus: string;
//       };
//     };
//     delivery: {
//       allowed: "yes" | "no" | null;
//       costOption: "yes" | "no" | null;
//       details: {
//         amount: string;
//         country: string;
//         city: string;
//       };
//     };
//   };
//   geolocation: {
//     campus: string;
//     country: string;
//   };
//   otherSpecialConditions: {
//     additionalDescription: string;
//     uploadedFiles: string[];
//   };
// }

// // Define the schema
// const SFSSubmitExchangeSchema = new Schema<SFSSubmitExchangeSchemaInterface>({
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
//     freeQuote: {
//       freeQuote: {
//         type: String,
//         enum: ["yes", "no", ""],
//         required: true,
//       },
//       feeAmount: {
//         type: Number, // Store feeAmount as a number
//         set: function (
//           this: SFSSubmitExchangeSchemaInterface,
//           value: any
//         ): number | null | undefined {
//           if (this.materialConditions.freeQuote.freeQuote === "yes") {
//             return undefined; // If freeQuote is 'yes', set feeAmount to undefined
//           }
//           if (this.materialConditions.freeQuote.freeQuote === "no") {
//             return isNaN(value) ? undefined : value; // Ensure feeAmount is a valid number
//           }
//           return value; // For other cases, return the value as is
//         },
//         required: function (this: SFSSubmitExchangeSchemaInterface): boolean {
//           return this.materialConditions.freeQuote.freeQuote === "no"; // Make feeAmount required only when freeQuote is 'no'
//         },
//         default: function (
//           this: SFSSubmitExchangeSchemaInterface
//         ): null | undefined {
//           return this.materialConditions.freeQuote.freeQuote === "yes" ||
//             this.materialConditions.freeQuote.freeQuote === ""
//             ? null
//             : undefined; // Default to null if freeQuote is 'yes' or ''
//         },
//         validate: {
//           validator: function (
//             this: SFSSubmitExchangeSchemaInterface,
//             value: number | null | undefined
//           ): boolean {
//             const freeQuoteValue = this.materialConditions.freeQuote.freeQuote;
//             if (freeQuoteValue === "no") {
//               return typeof value === "number" && !isNaN(value); // FeeAmount should be a valid number when freeQuote is 'no'
//             }
//             return value === null || value === undefined; // FeeAmount should be null or undefined when freeQuote is 'yes'
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
//       amountOfCost: {
//         type: Number,
//         set: function (value: any): number | null {
//           if (value === "null" || value === null) {
//             return null; // Convert 'null' string to actual null
//           }
//           return value; // Return the value as is if it's valid
//         },
//       },
//       natureOfTheseCost: { type: String, required: true },
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
// export { SFSSubmitExchangeSchema };

// const SFSSubmitExchangeModel =
//   mongoose.models.SFSSubmitExchangeSchema ||
//   mongoose.model("SFSSubmitExchangeSchema", SFSSubmitExchangeSchema);

// export default SFSSubmitExchangeModel;

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

// interface OtherPossibleCost {
//   otherPossibleCost: "yes" | "no" | "";
//   amountOfCost?: number | null;
//   natureOfTheseCost: string;
// }

// // Define the schema
// const SFSSubmitExchangeSchema = new Schema({
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
//     // otherPossibleCost: {
//     //   otherPossibleCost: {
//     //     type: String,
//     //     enum: ["yes", "no", ""],
//     //     required: true,
//     //   },
//     //   amountOfCost: { type: Number },
//     //   natureOfTheseCost: { type: String },
//     // },
//     otherPossibleCost: {
//       otherPossibleCost: {
//         type: String,
//         enum: ["yes", "no", ""],
//         required: true,
//       },
//       amountOfCost: {
//         type: Number,
//         // Handle 'null' string case and convert it to null
//         set: function (value: any): number | null {
//           if (value === "null") {
//             return null; // Convert 'null' string to actual null
//           }
//           return value; // Return the value as is if it's valid
//         },
//       },
//       natureOfTheseCost: { type: String, required: true },
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
// export { SFSSubmitExchangeSchema }; // Schema export

// const SFSSubmitExchangeModel =
//   mongoose.models.SFSSubmitExchangeSchema ||
//   mongoose.model("SFSSubmitExchangeSchema", SFSSubmitExchangeSchema);

// export default SFSSubmitExchangeModel;

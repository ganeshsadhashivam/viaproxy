import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  formData: {
    proposedOffer: {
      title: string;
      offerType: string;
      category: string;
      subcategory: string;
      featuredProductStatus: string;
      additionalDescription: string;
      startDate: Date | null;
      endDate: Date | null;
      formOfExchange: string;
    };
    materialConditions: {
      decision: string;
      percentage: string;
      moneyBackGuarantee: boolean;
      satisfactionGuarantee: boolean;
      desiredPaymentForm: string;
      desiredPaymentType: string;
    };
    deliveryConditions: {
      pickup: "yes" | "no" | "";
      pickupAddress: string;
      pickupCountry: string;
      pickupCity: string;
      pickupDetails: string;
      pickupCampus: string;
      delivery: "yes" | "no" | "";
      deliveryCost: string;
      deliveryCountry: string;
      deliveryCity: string;
    };
    expectedRequirements: Record<string, unknown>;
  };
  currentStep: number;
}

const initialState: FormState = {
  formData: {
    proposedOffer: {
      title: "",
      offerType: "",
      category: "",
      subcategory: "",
      featuredProductStatus: "",
      additionalDescription: "",
      startDate: null,
      endDate: null,
      formOfExchange: "",
    },
    materialConditions: {
      decision: "",
      percentage: "",
      moneyBackGuarantee: false,
      satisfactionGuarantee: false,
      desiredPaymentForm: "",
      desiredPaymentType: "",
    },
    deliveryConditions: {
      pickup: "",
      pickupAddress: "",
      pickupCountry: "",
      pickupCity: "",
      pickupDetails: "",
      pickupCampus: "",
      delivery: "",
      deliveryCost: "",
      deliveryCountry: "",
      deliveryCity: "",
    },
    expectedRequirements: {},
  },
  currentStep: 0,
};

const formSlice = createSlice({
  name: "productforproductexchangeform",
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<Partial<FormState["formData"]>>) {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
      state.currentStep = 0;
    },
  },
});

export const { setFormData, setCurrentStep, resetForm } = formSlice.actions;
export default formSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface FormState {
//   formData: {
//     proposedOffer: {
//       title: string;
//       offerType: string;
//       category: string;
//       subcategory: string;
//       featuredProductStatus: string;
//       additionalDescription: string;
//       startDate: Date | null;
//       endDate: Date | null;
//       formOfExchange: string;
//     };
//     materialConditions: {
//       decision: string;
//       percentage: string;
//       moneyBackGuarantee: boolean;
//       satisfactionGuarantee: boolean;
//       desiredPaymentForm: string;
//       desiredPaymentType: string;
//     };
//     deliveryConditions: {
//       pickup: "yes" | "no" | "";
//       pickupAddress: string;
//       pickupCountry: string;
//       pickupCity: string;
//       pickupDetails: string;
//       pickupCampus: string;
//       delivery: "yes" | "no" | "";
//       deliveryCost: string;
//       deliveryCountry: string;
//       deliveryCity: string;
//     };
//     expectedRequirements: Record<string, unknown>;
//   };
//   currentStep: number;
// }

// const initialState: FormState = {
//   formData: {
//     proposedOffer: {
//       title: "",
//       offerType: "",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "",
//       additionalDescription: "",
//       startDate: null,
//       endDate: null,
//       formOfExchange: "",
//     },
//     materialConditions: {
//       decision: "",
//       percentage: "",
//       moneyBackGuarantee: false,
//       satisfactionGuarantee: false,
//       desiredPaymentForm: "",
//       desiredPaymentType: "",
//     },
//     deliveryConditions: {
//       pickup: "",
//       pickupAddress: "",
//       pickupCountry: "",
//       pickupCity: "",
//       pickupDetails: "",
//       pickupCampus: "",
//       delivery: "",
//       deliveryCost: "",
//       deliveryCountry: "",
//       deliveryCity: "",
//     },
//     expectedRequirements: {},
//   },
//   currentStep: 0,
// };

// const formSlice = createSlice({
//   name: "productforproductexchangeform",
//   initialState,
//   reducers: {
//     setFormData(state, action: PayloadAction<Partial<FormState["formData"]>>) {
//       state.formData = { ...state.formData, ...action.payload };
//     },
//     setCurrentStep(state, action: PayloadAction<number>) {
//       state.currentStep = action.payload;
//     },
//     resetForm(state) {
//       state.formData = initialState.formData;
//       state.currentStep = 0;
//     },
//   },
// });

// export const { setFormData, setCurrentStep, resetForm } = formSlice.actions;
// export default formSlice.reducer;

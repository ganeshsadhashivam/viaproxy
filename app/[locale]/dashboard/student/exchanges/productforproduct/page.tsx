"use client";

import React, { useState } from "react";
import { FormProvider } from "./component/FormContext";
import MultiStepForm from "./MultistepForm";

const Page = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleTermsChange = () => {
    setAcceptedTerms((prev) => !prev);
  };

  return (
    <FormProvider>
      <div>
        {!acceptedTerms ? (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center my-6">
              Propose an Exchange Offer
            </h1>
            <div>
              <p>
                Finance your projects and expenses with your unused goods and
                services!
              </p>
              <p>
                I confirm that I have read and agree to the{" "}
                <span className="text-red-600">
                  Terms of Use and Privacy Policy.
                </span>
              </p>
              <input
                type="radio"
                onChange={handleTermsChange}
                checked={acceptedTerms}
              />
            </div>
          </div>
        ) : (
          <MultiStepForm />
        )}
      </div>
    </FormProvider>
  );
};

export default Page;

// import { FormProvider } from "./component/FormContext";

// export default function Page() {
//   return (
//     <FormProvider>
//       <div>
//         <div>
//           <div className="text-center m-2">
//             <h1>Propose An Exchange Offer</h1>
//             <p>
//               Finance your projects or expenses with your unused services or
//               goods !
//             </p>
//           </div>
//           <div className=" bg-gray-200 p-4 ml-10 mr-10">
//             <p className="m-3">
//               Take the initiative and value the surplus goods or services you
//               have, by exchanging them with the student community of the partner
//               campuses.{" "}
//             </p>
//             <p className="m-3">
//               Whether it's equipment, specific skills, or time, your
//               contribution can be exchanged for what you need, whether it's
//               another useful service or product.{" "}
//             </p>
//             <p className="m-3">
//               This supportive and circular exchange allows you to strengthen
//               cohesion between students, while giving a second life to your
//               unused resources, and contributing to a dynamic of sharing and
//               collaboration within the community
//             </p>
//             <p className="m-3">
//               Be part of this network of mutual aid, optimize your resources and
//               create opportunities that benefit all campus stakeholders!
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center flex-col text-center mt-5">
//           <h2 className="">Contract Terms Offer</h2>
//         </div>
//         <div className="ml-10 mr-10 mb-5 ">
//           <div className="p-5 border-spacing-1 border-black bg-gray-200 flex justify-center flex-col">
//             <p className="text-pretty m-1">
//               Our mission is to help citizens meet their needs by facilitating
//               the exchange of services and goods, in a secure way, while
//               improving their material conditions for success and promoting a
//               circular and solidarity economy within cities and campuses
//             </p>
//             <p className="text-pretty m-1">
//               You can fill in one or more offers on the exchange. These offers
//               are geolocated to be transmitted to students enrolled on partner
//               campuses!
//             </p>
//             <p className="text-pretty m-1">
//               Before you begin publishing your offer, you confirm that you have
//               read and agree to ViaProxy's Terms and Conditions of Use and Sale.
//             </p>
//             <h3 className="text-red-600 text-center">Advance Warning</h3>
//             <p className="text-pretty m-2">
//               By offering a product or service on our platform, you certify that
//               you are acting either as an owner or service provider or as an
//               agent legally invested by the owner of the good or the provider of
//               the services offered.
//             </p>
//             <p>
//               <input type="radio" />
//               confirm that I have read and agree to the Terms of Use and your
//               Privacy Policy. By posting your offer, you confirm that you agree
//               to our{" "}
//               <span className="text-red-600">
//                 Terms of Use and Privacy Policy.
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </FormProvider>
//   );
// }

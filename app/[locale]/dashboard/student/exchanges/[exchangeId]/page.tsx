"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Proposal {
  id: string;
  userId: string;
  offer: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

interface Exchange {
  id: string;
  userId: string;
  product: string;
  description: string;
  exchangeFor: string;
  status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
  proposals: Proposal[];
  createdAt: string;
  updatedAt: string;
}

const ExchangeDetails = () => {
  const { exchangeId } = useParams();
  const [exchange, setExchange] = useState<Exchange | null>(null);

  useEffect(() => {
    const fetchExchange = async () => {
      const response = await fetch(`/api/student/exchanges/${exchangeId}`);
      const data = await response.json();
      setExchange(data);
    };

    fetchExchange();
  }, [exchangeId]);

  if (!exchange) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {exchange.product}
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Field</th>
              <th className="border border-gray-300 p-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Description
              </td>
              <td className="border border-gray-300 p-2">
                {exchange.description}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Exchange For
              </td>
              <td className="border border-gray-300 p-2">
                {exchange.exchangeFor}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Status</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-4 py-1 text-sm font-medium text-white rounded-full ${
                    exchange.status === "completed"
                      ? "bg-green-500"
                      : exchange.status === "in_progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {exchange.status}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Created At
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(exchange.createdAt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Last Updated
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(exchange.updatedAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeDetails;

// "use client";
//exchange details before according to student dashboard 27-11-24
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
//  import { useSelector } from "react-redux";
//  import ProposalList from "../proposallist/page";
//  import ProposalForm from "../proposalform/page"; // Import the ProposalForm

// interface Proposal {
//   id: string;
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
// }

// interface Exchange {
//   id: string;
//   userId: string;
//   product: string;
//   description: string;
//   exchangeFor: string;
//   status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
//   proposals: Proposal[];
//   createdAt: string;
//   updatedAt: string;
// }

// const ExchangeDetails = () => {
//   const { exchangeId } = useParams();
//   const [exchange, setExchange] = useState<Exchange | null>(null);
//    const [proposals, setProposals] = useState<Proposal[]>([]);

//   // Get currentUserId from Redux state
//    const currentUserId = useSelector((state: any) => state.auth.user.userId);

//   useEffect(() => {
//     const fetchExchange = async () => {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`);
//       const data = await response.json();
//       setExchange(data);
//        setProposals(data.proposals || []);
//     };

//     fetchExchange();
//   }, [exchangeId]);

//   const handleProposalSubmit = (newProposal: Proposal) => {
//     setProposals((prevProposals) => [...prevProposals, newProposal]);
//   };

//   if (!exchange) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{exchange.product}</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <div>
//           <p className="font-medium">Description:</p>
//           <p className="text-gray-700">{exchange.description}</p>
//         </div>
//         <div>
//           <p className="font-medium">Exchange For:</p>
//           <p className="text-gray-700">{exchange.exchangeFor}</p>
//         </div>
//         <div>
//           <p className="font-medium">Status:</p>
//           <span
//             className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//               exchange.status === "completed"
//                 ? "bg-green-500"
//                 : exchange.status === "in_progress"
//                 ? "bg-blue-500"
//                 : "bg-yellow-500"
//             }`}
//           >
//             {exchange.status}
//           </span>
//         </div>
//       </div>

//       {/* Show Proposal Form only if the current user is NOT the creator of the exchange */}
//       {currentUserId && currentUserId !== exchange.userId && (
//         <ProposalForm
//           exchangeId={exchange.id}
//           onProposalSubmit={handleProposalSubmit}
//         />
//       )}

//       {/* Always Show Proposal List */}
//       <ProposalList proposals={proposals} />
//     </div>
//   );
// };

// export default ExchangeDetails;

// "use client";

//for redux userId
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ProposalList from "../proposallist/page";
// import ProposalForm from "../proposalform/page"; // Import the ProposalForm

// interface Proposal {
//   id: string;
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
// }

// interface Exchange {
//   id: string;
//   userId: string;
//   product: string;
//   description: string;
//   exchangeFor: string;
//   status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
//   proposals: Proposal[];
//   createdAt: string;
//   updatedAt: string;
// }

// const ExchangeDetails = () => {
//   const { exchangeId } = useParams();
//   const [exchange, setExchange] = useState<Exchange | null>(null);
//   const [proposals, setProposals] = useState<Proposal[]>([]);

//   useEffect(() => {
//     const fetchExchange = async () => {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`);
//       const data = await response.json();
//       setExchange(data);
//       setProposals(data.proposals || []);
//     };

//     fetchExchange();
//   }, [exchangeId]);

//   const handleProposalSubmit = (newProposal: Proposal) => {
//     setProposals((prevProposals) => [...prevProposals, newProposal]);
//   };

//   if (!exchange) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{exchange.product}</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <div>
//           <p className="font-medium">Description:</p>
//           <p className="text-gray-700">{exchange.description}</p>
//         </div>
//         <div>
//           <p className="font-medium">Exchange For:</p>
//           <p className="text-gray-700">{exchange.exchangeFor}</p>
//         </div>
//         <div>
//           <p className="font-medium">Status:</p>
//           <span
//             className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//               exchange.status === "completed"
//                 ? "bg-green-500"
//                 : exchange.status === "in_progress"
//                 ? "bg-blue-500"
//                 : "bg-yellow-500"
//             }`}
//           >
//             {exchange.status}
//           </span>
//         </div>
//       </div>

//       {/* Proposal Form */}
//       <ProposalForm
//         exchangeId={exchange.id}
//         onProposalSubmit={handleProposalSubmit}
//       />

//       {/* Proposal List */}
//       <ProposalList proposals={proposals} />
//     </div>
//   );
// };

// export default ExchangeDetails;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ProposalList from "../proposallist/page";

// interface Proposal {
//   id: string;
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
// }

// interface Exchange {
//   id: string;
//   userId: string;
//   product: string;
//   description: string;
//   exchangeFor: string;
//   status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
//   proposals: Proposal[];
//   createdAt: string;
//   updatedAt: string;
// }

// const ExchangeDetails = () => {
//   const { exchangeId } = useParams();
//   const [exchange, setExchange] = useState<Exchange | null>(null);

//   useEffect(() => {
//     const fetchExchange = async () => {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`);
//       const data = await response.json();
//       setExchange(data);
//     };

//     fetchExchange();
//   }, [exchangeId]);

//   if (!exchange) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{exchange.product}</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <div>
//           <p className="font-medium">Description:</p>
//           <p className="text-gray-700">{exchange.description}</p>
//         </div>
//         <div>
//           <p className="font-medium">Exchange For:</p>
//           <p className="text-gray-700">{exchange.exchangeFor}</p>
//         </div>
//         <div>
//           <p className="font-medium">Status:</p>
//           <span
//             className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//               exchange.status === "completed"
//                 ? "bg-green-500"
//                 : exchange.status === "in_progress"
//                 ? "bg-blue-500"
//                 : "bg-yellow-500"
//             }`}
//           >
//             {exchange.status}
//           </span>
//         </div>
//       </div>

//       <ProposalList proposals={exchange.proposals} />
//     </div>

//   );
// };

// export default ExchangeDetails;

// <div className="p-6">
//   <h1 className="text-2xl font-bold">{exchange.product}</h1>
//   <p>{exchange.description}</p>
//   <p>Exchange For: {exchange.exchangeFor}</p>
//   <p>Status: {exchange.status}</p>
//   <ProposalList proposals={exchange.proposals} />
// </div>

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// const ExchangeDetails = () => {
//   const { exchangeId } = useParams();
//   const [exchange, setExchange] = useState(null);

//   useEffect(() => {
//     const fetchExchange = async () => {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`);
//       const data = await response.json();
//       setExchange(data);
//     };

//     fetchExchange();
//   }, [exchangeId]);

//   if (!exchange) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{exchange.product}</h1>
//       <p>{exchange.description}</p>
//       <p>Exchange For: {exchange.exchangeFor}</p>
//       <p>Status: {exchange.status}</p>
//       {/* Add Proposal List Component */}
//     </div>
//   );
// };

// export default ExchangeDetails;

"use client";
import React, { useEffect, useState } from "react";

interface Exchange {
  id: string;
  product: string;
  description: string;
  exchangeFor: string;
  status: "pending" | "in_progress" | "completed";
}

const OngoingExchanges = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyExchanges = async () => {
      try {
        const response = await fetch("/api/student/exchanges/myexchanges");
        if (!response.ok) {
          throw new Error("Failed to fetch exchanges");
        }
        const data = await response.json();
        setExchanges(data);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyExchanges();
  }, []);

  if (loading) {
    return <p>Loading your exchanges...</p>;
  }

  if (exchanges.length === 0) {
    return <p>No exchanges created yet.</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Exchanges</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Product</th>
            <th className="border border-gray-300 p-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 p-2 text-left">
              Exchange For
            </th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange) => (
            <tr key={exchange.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{exchange.product}</td>
              <td className="border border-gray-300 p-2">
                {exchange.description}
              </td>
              <td className="border border-gray-300 p-2">
                {exchange.exchangeFor}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <span
                  className={`px-4 py-2 text-sm font-medium text-white rounded-full ${
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingExchanges;

// const handleDelete = async (exchangeId: string) => {
//     const confirmed = confirm("Are you sure you want to delete this exchange?");
//     if (!confirmed) return;

//     try {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Exchange deleted successfully!");

//         // Update the state to remove the deleted exchange
//         setExchanges((prevExchanges) =>
//           prevExchanges.filter((exchange) => exchange.id !== exchangeId)
//         );
//       } else {
//         const errorData = await response.json();
//         alert(
//           `Failed to delete the exchange: ${errorData.error || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting exchange:", error);
//       alert("An error occurred while trying to delete the exchange.");
//     }
//   };

//   const handleModify = (exchangeId: string) => {
//     // Redirect or open a form/modal for modification
//     console.log("Modify clicked for Exchange ID:", exchangeId);
//     window.location.href = `/dashboard/student/exchanges/${exchangeId}/edit`; // Redirect to an edit page
//   };

// <th className="border border-gray-300 p-2 text-left">Actions</th>
{
  /* <td className="border border-gray-300 p-2 flex space-x-2">
                
                <Link href={`/dashboard/student/exchanges/${exchange.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View
                  </button>
                </Link>

               
                <Link href={`/dashboard/student/exchanges/${exchange.id}/edit`}>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleModify(exchange.id)}
                  >
                    Modify
                  </button>
                </Link>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(exchange.id)}
                >
                  Delete
                </button>
</td> */
}

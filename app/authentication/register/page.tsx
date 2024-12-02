"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loader when registration starts
    try {
      const res = await fetch("/api/authentication/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Registration successful!");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Hide loader after registration completes
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              placeholder="Enter your name"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white transition-colors ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* Toast Container */}
        <ToastContainer />

        {/* Loader Overlay */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function RegisterPage() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/authentication/register", {
//         method: "POST",
//         body: JSON.stringify(form),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message || "Registration successful!");
//       } else {
//         toast.error(data.error || "Something went wrong.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred.");
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
//         >
//           <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
//           <div className="mb-4">
//             <label
//               htmlFor="Username"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               name="Username"
//               id="Username"
//               placeholder="Enter your name"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               required
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="Email"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="Email"
//               name="Email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="Password"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="Password"
//               name="Password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Register
//           </button>
//         </form>
//         {/* Toast Container */}
//         <ToastContainer />
//       </div>
//     </>
//   );
// }

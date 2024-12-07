"use client";

import React, { useEffect, useState } from "react";
import ExchangeList from "../exchangelist/page";
import StatusFilter from "../statusfilter/page";

const MyExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchMyExchanges = async () => {
      try {
        const response = await fetch("/api/student/exchanges/myexchanges");
        if (!response.ok) {
          throw new Error("Failed to fetch exchanges");
        }
        const data = await response.json();
        console.log(data);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Exchanges</h1>
      <StatusFilter filter={filter} setFilter={setFilter} />
      <ExchangeList exchanges={exchanges} />
    </div>
  );
};

export default MyExchangesPage;

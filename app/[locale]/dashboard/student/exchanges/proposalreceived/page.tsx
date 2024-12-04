"use client";

import React, { useEffect, useState } from "react";
import ProposalList from "../proposallist/page";

const ProposalReceived = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch(
          `/api/student/exchanges/proposals/received`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();
        setProposals(data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) {
    return <p>Loading proposals...</p>;
  }

  return (
    <div className="p-6">
      <ProposalList proposals={proposals} />
    </div>
  );
};

export default ProposalReceived;

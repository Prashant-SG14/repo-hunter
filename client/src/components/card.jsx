import { useState, useEffect } from "react";

export default card = (repo) => {
  const handleClick = async (repo) => {
    try {
      const res = await fetch(`http://localhost:5000/api/commits/${repo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const commitData = await res.json();
        const weeksPerMonth = 4; // rough average
        const monthlyData = [];

        for (let i = 0; i < commitData.length; i += weeksPerMonth) {
          const monthSlice = commitData.slice(i, i + weeksPerMonth);
          const totalCommits = monthSlice.reduce(
            (sum, week) => sum + week.total,
            0,
          );
          monthlyData.push(totalCommits);
        }
      }
    } catch (error) {}
  };
  return <div></div>;
};

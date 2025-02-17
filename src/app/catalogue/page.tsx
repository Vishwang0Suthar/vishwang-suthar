"use client";
import Collection from "@/containers/catalogue";
import React, { useEffect, useState } from "react";

const Catalogue = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section>
      <h1 className="text-6xl py-10">Catalogue</h1>
      {isLoading ? (
        <div className="loader absolute top-1/2 left-1/2"></div>
      ) : (
        <Collection />
      )}
    </section>
  );
};

export default Catalogue;

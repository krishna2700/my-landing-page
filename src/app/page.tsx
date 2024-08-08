"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Plan {
  name: string;
  cost: number;
  logo: string;
}

const plans: Plan[] = [
  { name: "Aetna", cost: 50, logo: "/aetna.png" },
  { name: "Cigna", cost: 100, logo: "/cigna.jpg" },
  { name: "Medicaid", cost: 500, logo: "/medicaid.png" },
  { name: "Medicare", cost: 500, logo: "/medicare.png" },
];

export default function Home() {
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
  const [providerType, setProviderType] = useState<string>("Group");
  const [numberOfProviders, setNumberOfProviders] = useState<number>(1);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    new Array(plans.length).fill(false)
  );

  const togglePlan = (plan: Plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
    );
  };

  const estimatedCost = selectedPlans.reduce(
    (total, plan) => total + plan.cost * numberOfProviders,
    0
  );

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newImageLoaded = [...prev];
      newImageLoaded[index] = true;
      return newImageLoaded;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Welcome to Our Service
      </h1>

      <div className="flex flex-wrap justify-around mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer mb-4 transition-transform transform ${
              selectedPlans.includes(plan)
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => togglePlan(plan)}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={`w-16 h-16 mb-2 flex items-center justify-center ${
                imageLoaded[index] ? "hidden" : "bg-gray-200"
              }`}
            >
              {imageLoaded[index] ? null : (
                <span className="text-gray-500">Loading...</span>
              )}
            </div>
            <Image
              src={plan.logo}
              alt={plan.name}
              width={64}
              height={64}
              className={`transition-opacity ${
                imageLoaded[index] ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => handleImageLoad(index)}
            />
            <span className="text-lg font-medium text-black mt-2">
              {plan.name}
            </span>
            <span className="text-gray-500">${plan.cost}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <label className="mr-4 text-black">
          <input
            type="radio"
            value="Group"
            checked={providerType === "Group"}
            onChange={() => setProviderType("Group")}
            className="mr-2"
          />
          Group
        </label>
        <label className="text-black">
          <input
            type="radio"
            value="Solo"
            checked={providerType === "Solo"}
            onChange={() => setProviderType("Solo")}
            className="mr-2"
          />
          Solo
        </label>
      </div>

      <div className="flex justify-center items-center mb-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 transition-colors hover:bg-blue-600"
          onClick={() => setNumberOfProviders((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <input
          type="number"
          value={numberOfProviders}
          min="1"
          className="text-center w-20 text-lg p-2 border border-gray-300 rounded-md text-black"
          onChange={(e) =>
            setNumberOfProviders(Math.max(1, Number(e.target.value)))
          }
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 transition-colors hover:bg-blue-600"
          onClick={() => setNumberOfProviders((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <motion.div
        className="text-2xl font-bold text-center text-blue-600"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        Estimated Cost: ${estimatedCost}
      </motion.div>
    </div>
  );
}

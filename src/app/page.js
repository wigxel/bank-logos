"use client";
import React from "react";
import banks from "../data/banks.json";
import { useState } from "react";

export default function Home() {
  // Convert Json Object to Array
  const bankList = Object.keys(banks).map((key) => banks[key]);
  
  const [search, setSearch] = useState("");
  
  //Filter the banks based on the search input
  const filteredBanks = bankList.filter((bank) => bank.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="p-4 justify-items-center">
          <h1 className="text-lg font-bold pb-4">Banks List</h1>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for a bank"
            className="p-2 border border-gray-400 rounded-lg">
          </input>
        </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBanks.length > 0 ? (
          filteredBanks.map((bank, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow flex flex-col items-center">
              <h2 className="text-md semi-bold">{bank.name}</h2>
            </div>  
          ))
        ) : (
          <div className="p-8 text-red-500 col-span-full flex items-center justify-center">
            <h2 className="text-lg font-meduim">Bank not found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

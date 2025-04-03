"use client";
import React from "react";
import banks from "../data/banks.json";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  // Convert Json Object to Array
  const bankList = Object.keys(banks).map((key) => banks[key]);

  const [search, setSearch] = useState("");

  //Filter the banks based on the search input
  const filteredBanks = bankList.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );
  const bankLength = filteredBanks.length;

  return (
    <div className=" border border-gray-800 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="p-4 justify-items-center">
        <h1 className="text-lg font-bold pb-4">Banks List</h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for a bank"
          className="p-2 border border-gray-400 rounded-lg"
        ></input>
      </div>

      <div
        // className={`grid grid-cols-1 sm:grid-cols-2 ${
        //   bankLength < 2
        //     ? "lg:grid-cols-1"
        //     : bankLength < 3
        //     ? "lg:grid-cols-2"
        //     : "lg:grid-cols-3 "
        // } border-l border-t border-gray-300`}
        className="w-full overflow-hidden"
      >
        {filteredBanks.length > 0 ? (
          <div >
            <div className="grid grid-cols-3 auto-cols-fr grid-flow-row border-l border-t border-gray-300">
  
            {filteredBanks.map((bank, index) => {

            return (
              // Display the bank name and logo in a grid layout
              <div
                key={index}
                className="pt-16 pb-24 border-r border-b border-gray-300 flex flex-col items-center"
              >
                <Image
                  src={bank.svg?.replace("public", "")}
                  alt={bank.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 mb-4"
                />

                <h2 className="text-md font-semibold">{bank.name}</h2>
              </div>
            );
          })}

            </div>
          </div>

        ) : (
          <div className="p-16 text-red-500 flex items-center justify-center border border-gray-300">
            <h2 className="text-lg font-medium">Bank not found</h2>
          </div>
        )}
      </div>

    </div>
  );
}

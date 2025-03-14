import Image from "next/image";
import banks from "../data/banks.json";

export default function Home() {
  // Convert Json Object to Array
  const bankList = Object.keys(banks).map((key) => banks[key]);
  console.log(bankList);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="p-4 justify-items-center">
          <h1 className="text-lg font-bold pb-4">Banks List</h1>
          <input
            type="text"
            placeholder="Search for a bank"
            className="p-2 border border-gray-400 rounded-lg">
          </input>
        </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bankList.map((bank, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg"
          >
            <h2 className="text-md font-semibold">{bank.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

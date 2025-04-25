//Script to read banks.json and call upload function
import {api} from "../../convex/_generated/api";
import banks from "../data/banks.json";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function uploadBanks() {
 const formattedBanks = Object.values(banks).map(bank => ({ png: bank.png, svg: bank.svg }));
 for (const bank of formattedBanks) {
   await convex.mutation(api.functions.bankUpload.bankUpload, { [bank.png]: bank });
 }
  console.log("Banks uploaded successfully.");
}

uploadBanks().catch((error) => {
  console.error("Error uploading banks:", error);
});
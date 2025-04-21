//Script to read banks.json and call upload function
import {api} from "../convex/_generated/api";
import banks from "../src/data/banks.json";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function uploadBanks() {
  const upload = convex.mutation(api.bankUpload);
  await upload(banks);
  console.log("Banks uploaded successfully.");
}

uploadBanks().catch((error) => {
  console.error("Error uploading banks:", error);
});
import {mutation} from '../_generated/server';

export const bankUpload = mutation(
  async ({db}: {db: any}, banks: Record<string, { png: string; svg: string }>) => {
    for (const [key, bank] of Object.entries(banks)) {
      await db.insert('bankLogos', {
        name: key,
        png: bank.png,
        svg: bank.svg,
        createdAt: Date.now(),
      });
    }

  }
)
import { query } from "./_generated/server";
import { action } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const getVideoLinks = action({
  // Define the arguments the action expects
  args: { inputText: "string" },

  // Handler that processes the request and generates video links
  handler: async ({ inputText }) => {
    const videoLinks = Array.from({ length: 3 }, (_, i) => `https://example.com/${i}`);

    return { videoLinks };
  },
});
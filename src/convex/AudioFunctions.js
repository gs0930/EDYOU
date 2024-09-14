import { action } from "./_generated/server";

export const generateSong = action({
  args: { gptDescriptionPrompt: "string", prompt: "string", tags: "string" }, // Define the arguments needed
  handler: async ({ gptDescriptionPrompt, prompt, tags }) => {
    const response = await fetch("https://api.thirdpartyservice.com/api/generate/v2/", {
      method: 'POST',
      headers: {
        'Authorization': `XceiWJD3LjYnOnkqErAYbQ9T740eHT4O`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        gpt_description_prompt: gptDescriptionPrompt,
        tags: tags,
        mv: 'chirp-v3-5'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  }
});

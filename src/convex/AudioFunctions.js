// import { action } from "./_generated/server";
// import { query } from "./_generated/server";
// import { v } from "convex/values";

// export const generateSong = action({
//     args: {
//         topic: v.optional(v.string()),
//         tags: v.optional(v.string())
//     },
//     handler: async ({ topic, tags }) => {
//         const response = await fetch("https://studio-api.suno.ai/api/external/generate/", {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer XceiWJD3LjYnOnkqErAYbQ9T740eHT4O',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 topic: topic,
//                 tags: tags,
//                 mv: 'chirp-v3-5'
//             })
//         });

//         if (!response.ok) {
//             //throw new Error(`Failed to fetch: ${response.statusText}`);
//             const errorData = await response.text();
//             throw new Error(`Failed to fetch: ${response.statusText} - ${errorData}`);
//         }

//         const data = await response.json();

//         return data;
//     }
// });

import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateSong = action({
    args: {
        topic: v.string(), // For generating song topic
        tags: v.optional(v.string()) // Optional tags for music style
    },
    handler: async ({ topic, tags }) => {
        if (!topic) {
            throw new Error("Topic is required");
        }

        // Logging for debugging
        console.log("Topic:", topic);
        console.log("Tags:", tags);

        const response = await fetch("https://studio-api.suno.ai/api/external/generate/", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer XceiWJD3LjYnOnkqErAYbQ9T740eHT4O',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: topic, // Make sure topic is passed correctly
                tags: tags || "", // Optional style tags
                mv: 'chirp-v3-5' // Required model version
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Failed to fetch: ${response.statusText} - ${errorData}`);
        }

        const data = await response.json();
        return data;
    }
});

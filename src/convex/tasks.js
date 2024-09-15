import { query } from "./_generated/server";
import { action } from "./_generated/server";
//import { string } from 'convex/validators'; 
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// export const getVideoLinks = action({
//   // Define the arguments the action expects
//   args: { inputText: "string" },

//   // Handler that processes the request and generates video links
//   handler: async ({ inputText }) => {
//     const videoLinks = Array.from({ length: 3 }, (_, i) => `https://example.com/${i}`);

//     return { videoLinks };
//   },
// });

// export const getVideoLinks = action({
//   args: { inputText: v.string() },

//   // Handler that processes the request and generates video links
//   handler: async ({ inputText }) => {
//     console.log("reached"+inputText);
//     const API_KEY = 'AIzaSyCMrfktvlGDg6Eiy10Qa2Vs9UXUvQXEhRI'; 
//     const searchQuery = encodeURIComponent(inputText);
//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&key=${API_KEY}&maxResults=3`;

//     try {
//       const response = await fetch(url);
      
//       const data = await response.json();
      
//       if (data.items && data.items.length > 0) {
//         console.log("data items" + data.items[0]);
//         const videoLinks = data.items.slice(0, 5).map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);        
//         return { videoLinks };
//       } else {
//         return { videoLinks: [] }; // Return empty array if no results are found
//       }
//     } catch (error) {
//       console.error('Error fetching YouTube data:', error);
//       return { videoLinks: [] }; 
//     }
//   },
// });
export const getVideoLinks = action({
  args: { input_text: v.string() }, // Validate input_text as a string

  handler: async ({ input_text }) => {
    try {
      const response = await fetch(`http://localhost:8000/get-video-links?input_text=${input_text}`);
      const data = await response.json();
      return data.video_links;
    } catch (error) {
      console.error("Error fetching video links:", error);
      throw new Error("Failed to fetch video links");
    }
  },
});

// Action to get markdown from the backend
export const getMarkdown = action({
  args: { input_text: v.string() }, // Validate input_text as a string

  handler: async ({ input_text }) => {
    try {
      const response = await fetch(`http://localhost:8000/get-markdown?input_text=${input_text}`);
      const data = await response.json();
      return data.markdown_text;
    } catch (error) {
      console.error("Error fetching markdown:", error);
      throw new Error("Failed to fetch markdown");
    }
  },
});

// Action to get loaded images from the backend
export const getLoadedImages = action({
  args: { input_text: v.string() }, // Validate input_text as a string

  handler: async ({ input_text }) => {
    try {
      const response = await fetch(`http://localhost:8000/get-loaded-images?input_text=${input_text}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw new Error("Failed to fetch images");
    }
  },
});




// export const getImageLinks = action(async ({ searchTerm }) => {
//   const apiKey = "your-unsplash-api-key";
//   const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=${apiKey}&per_page=3`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     const imageUrls = data.results.map((result) => result.urls.small); // Get small-sized images
//     return { images: imageUrls };
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     throw new Error("Failed to fetch images");
//   }
// });
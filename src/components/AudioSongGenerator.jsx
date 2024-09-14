import React from 'react';
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust this path according to your structure
import { useState } from 'react';

const AudioSongGenerator = () => {
    const generateSong = useAction(api.generateSong); // Hook to call the Convex action
    const [songData, setSongData] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleGenerateSong = async () => {
      setLoading(true);
      try {
        const generatedSong = await generateSong({
          gptDescriptionPrompt: "a pop song about HackMIT",
          prompt: "",  // If you want GPT to generate lyrics
          tags: "pop"
        });
        setSongData(generatedSong);
      } catch (error) {
        console.error('Error generating song:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div>
          <button onClick={handleGenerateSong} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Song'}
          </button>
          {songData && (
            <div>
              <h3>Generated Song</h3>
              {/* Display generated song details here */}
              <pre>{JSON.stringify(songData, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    };
    
    export default AudioSongGenerator;
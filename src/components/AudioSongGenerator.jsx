import React from 'react';
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust this path according to your structure
import { useState } from 'react';

const AudioSongGenerator = () => {
    const generateSong = useAction(api.AudioFunctions.generateSong); // Hook to call the Convex action
    const [songData, setSongData] = useState(null);
    const [loading, setLoading] = useState(false);

    // const handleGenerateSong = async () => {
    //     setLoading(true);
    //     try {
    //         const generatedSong = await generateSong({
    //             topic: "A song about traveling on Christmas",
    //             tags: "pop"
    //         });
    //         setSongData(generatedSong);
    //     } catch (error) {
    //         console.error('Error generating song:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleGenerateSong = async () => {
        try {
            const topic = "A song about traveling on Christmas"; // or get this from a user input field
            const tags = "pop"; // optional tags
            const result = generateSong({ topic: topic, tags: tags });
            console.log("Generated song:", result);
        } catch (error) {
            console.error("Error generating song:", error);
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
                    <pre>{JSON.stringify(songData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AudioSongGenerator;
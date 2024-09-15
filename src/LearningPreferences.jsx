import React, { useState } from 'react';
import { useAction } from "convex/react";
import { api } from "./convex/_generated/api";

const LearningPreferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission
  const getVideoLinks = useAction(api.tasks.getVideoLinks);

  const handlePreferenceChange = (selectedPreference) => {
    setPreferences((prevPreferences) =>
      prevPreferences.includes(selectedPreference)
        ? prevPreferences.filter((pref) => pref !== selectedPreference)
        : [...prevPreferences, selectedPreference]
    );
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set isSubmitted to true when the form is submitted
  };

  const getVideos = () => {
    console.log(searchInput);
    const videos = getVideoLinks({ inputText: searchInput });
    return videos;
  };

  const renderOutputBoxes = () => {
    const videos = getVideos();
    return (
      <>
        {preferences.includes('Visual') && (
          <div className="output-box visual-box">
            <h3>Visual Resources</h3>
            <p>Displaying visual content related to "{searchInput}".</p>
            <div className="videos-container">
              {/* {videos && videos.length > 0 ? (
                videos.map((videoLink, index) => (
                  <div key={index} className="video-wrapper">
                    <a href={videoLink} target="_blank" rel="noopener noreferrer">
                      <iframe
                        width="560"
                        height="315"
                        src={`${videoLink.replace('watch?v=', 'embed/')}`}
                        title={`YouTube video player ${index}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </a>
                  </div>
                ))
              ) : (
                <p>No videos found for the search input.</p>
              )} */}
            </div>
          </div>
        )}
        {preferences.includes('Textual') && (
          <div className="output-box textual-box">
            <h3>Textual Resources</h3>
            <p>Displaying textual content related to "{searchInput}".</p>
          </div>
        )}
        {preferences.includes('Audio') && (
          <div className="output-box audio-box">
            <h3>Audio Resources</h3>
            <p>Playing audio content related to "{searchInput}".</p>
          </div>
        )}
        {preferences.includes('Kinesthetic') && (
          <div className="output-box kinesthetic-box">
            <h3>Kinesthetic Resources</h3>
            <p>Displaying kinesthetic content related to "{searchInput}".</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Your Learning Preferences</h2>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => handlePreferenceChange('Visual')}
          className={preferences.includes('Visual') ? 'active' : ''}
        >
          Visual
        </button>
        <button
          onClick={() => handlePreferenceChange('Textual')}
          className={preferences.includes('Textual') ? 'active' : ''}
        >
          Textual
        </button>
        <button
          onClick={() => handlePreferenceChange('Audio')}
          className={preferences.includes('Audio') ? 'active' : ''}
        >
          Audio
        </button>
        <button
          onClick={() => handlePreferenceChange('Kinesthetic')}
          className={preferences.includes('Kinesthetic') ? 'active' : ''}
        >
          Kinesthetic
        </button>
      </div>

      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="search">Learn about: </label>
        <input
          id="search"
          type="text"
          placeholder="Enter a topic"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>Selected Preferences: <strong>{preferences.join(', ') || 'None'}</strong></p>
      </div>

      <div style={{ marginTop: '20px' }}>
        {isSubmitted && renderOutputBoxes()} {/* Only render output boxes after submission */}
      </div>
    </div>
  );
};

export default LearningPreferences;

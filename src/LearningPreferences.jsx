import React, { useState, useEffect } from 'react';
import { useAction } from "convex/react";
import { api } from "./convex/_generated/api";

const LearningPreferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [videoLinks, setVideoLinks] = useState([]); 
  const [images, setImages] = useState([]); 
  const [markdown, setMarkdown] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  const getVideoLinks = useAction(api.tasks.getVideoLinks);
  const getMarkdown = useAction(api.tasks.getMarkdown);
  const getLoadedImages = useAction(api.tasks.getLoadedImages);

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
    setIsSubmitted(true); 
    setIsLoading(true); 
  };

  const getVideos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get-video-links?input_text=${searchInput}`);
      const videos = await response.json(); 
      return videos.video_links || [];
    } catch (error) {
      console.error('Error fetching video links:', error);
      return [];
    }
  };

  const getImages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get-loaded-images?input_text=${searchInput}`);
      const images = await response.json();
      return images || [];
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };

  const getText = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get-markdown?input_text=${searchInput}`);
      const markdown = await response.json();
      return markdown.markdown_text;
    } catch (error) {
      console.error('Error fetching markdown:', error);
      return '';
    }
  };

  const convertToEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0]; 
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    if (isSubmitted) {
      const fetchData = async () => {
        const videos = await getVideos();
        const images = await getImages();
        const text = await getText();
        setVideoLinks(videos);
        setImages(images);
        setMarkdown(text);
        setIsLoading(false); 
      };
      fetchData();
    }
  }, [isSubmitted]); 

  const renderOutputBoxes = () => {
    return (
      <>
        {preferences.includes('Visual') && (
          <div className="output-box visual-box">
            <h3>Visual Resources</h3>
            <h4>Videos</h4>
            
            <div className="videos-container">
              {videoLinks.length > 0 ? (
                videoLinks.map((videoLink, index) => (
                  <div key={index} className="video-wrapper">
                    <iframe
                      width="560"
                      height="315"
                      src={convertToEmbedUrl(videoLink)}
                      title={`YouTube video player ${index}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))
              ) : (
                <p>No videos found for the search input.</p>
              )}
            </div>

            <div className="videos-container">
              <h4>Images</h4>
              {images.length > 0 && images[0].length > 0 ? (
                images[0].map((imageUrl, index) => (
                  <div key={index} className="image-wrapper">
                    <img
                      src={imageUrl}
                      alt={`related visual content ${index}`}  
                      style={{ width: 'auto', height: '200px', maxHeight: '200px', objectFit: 'contain' }} 
                    />
                  </div>
                ))
              ) : (
                <p>No images found for the search input.</p>
              )}
            </div>
          </div>
        )}
        {preferences.includes('Textual') && (
          <div className="output-box textual-box">
            <h3>Textual Resources</h3>
            <p>{markdown}</p>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>Selected Preferences: <strong>{preferences.join(', ') || 'None'}</strong></p>
      </div>

      {isSubmitted && (
        <div style={{ marginTop: '20px' }}>
          {isLoading ? <p>Loading resources...</p> : renderOutputBoxes()} 
        </div>
      )}
    </div>
  );
};

export default LearningPreferences;

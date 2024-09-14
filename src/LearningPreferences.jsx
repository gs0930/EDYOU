import React, { useState } from 'react';

const LearningPreferences = () => {
  // State to store selected preferences and search input
  const [preferences, setPreferences] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Handler 
  const handlePreferenceChange = (selectedPreference) => {
    setPreferences((prevPreferences) =>
      prevPreferences.includes(selectedPreference)
        ? prevPreferences.filter((pref) => pref !== selectedPreference)
        : [...prevPreferences, selectedPreference]
    );
  };

  // Handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Submit handler for the search bar
  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
    </div>
  );
};

export default LearningPreferences;

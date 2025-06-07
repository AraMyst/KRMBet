// src/SportsBetting/SportSelector.jsx
import React, { useEffect, useState } from 'react';
import oddsService from '../services/oddsService';

/**
 * SportSelector
 *
 * Fetches available sports from the backend and renders a dropdown
 * to select one. Calls onSportChange when the selection changes.
 *
 * Props:
 *   - onSportChange: (sportKey: string) => void
 */
const SportSelector = ({ onSportChange }) => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const data = await oddsService.getSports();
        setSports(data);
        if (data.length > 0) {
          setSelectedSport(data[0].key);
          onSportChange(data[0].key);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load sports list.');
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, [onSportChange]);

  const handleChange = (e) => {
    const sportKey = e.target.value;
    setSelectedSport(sportKey);
    onSportChange(sportKey);
  };

  if (loading) return <div>Loading sports...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mb-4">
      <label htmlFor="sport-select" className="block text-sm font-medium mb-1">
        Select Sport
      </label>
      <select
        id="sport-select"
        value={selectedSport}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
      >
        {sports.map((sport) => (
          <option key={sport.key} value={sport.key}>
            {sport.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportSelector;

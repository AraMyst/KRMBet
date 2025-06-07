// src/SportsBetting/EventList.jsx
import React, { useEffect, useState } from 'react';
import oddsService from '../services/oddsService';

/**
 * EventList
 *
 * Fetches upcoming events for a given sport and displays them.
 * Calls onEventSelect when the user clicks an event.
 *
 * Props:
 *   - sportKey: string
 *   - onEventSelect: (event: { id, name, teams, commenceTime }) => void
 */
const EventList = ({ sportKey, onEventSelect }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sportKey) return;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await oddsService.getEvents(sportKey);
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [sportKey]);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (events.length === 0) return <div>No events available.</div>;

  return (
    <div className="space-y-2 mb-6">
      <h2 className="text-xl font-semibold text-fortino-goldSoft">Events</h2>
      <ul className="divide-y divide-fortino-goldSoft">
        {events.map((evt) => (
          <li
            key={evt.id}
            onClick={() => onEventSelect(evt)}
            className="cursor-pointer p-2 hover:bg-fortino-darkGreen/80 rounded-md"
          >
            <div className="flex justify-between">
              <span>{evt.name}</span>
              <span className="text-sm text-fortino-softWhite">
                {new Date(evt.commenceTime).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

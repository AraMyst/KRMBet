// src/hooks/useOdds.js
import { useState, useEffect, useCallback } from 'react';
import oddsService from '../services/oddsService';

/**
 * useOdds
 *
 * Custom hook to fetch and manage sports odds data.
 * Accepts an optional filters object for querying specific odds.
 *
 * Params:
 *  - filters: object (e.g. { sport: 'soccer', region: 'uk' })
 *
 * Returns:
 *  - odds: array of odds objects
 *  - loading: boolean indicating fetch status
 *  - error: string if fetch failed
 *  - refreshOdds(): function to re-fetch odds
 */
export const useOdds = (filters = {}) => {
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOdds = useCallback(async () => {
    setLoading(true);
    try {
      const data = await oddsService.getOdds(filters);
      setOdds(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load odds.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOdds();
  }, [fetchOdds]);

  return { odds, loading, error, refreshOdds: fetchOdds };
};

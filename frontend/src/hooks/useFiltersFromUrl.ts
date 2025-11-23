import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Filters } from "../models/filters.model";

interface UseFiltersFromUrlReturn {
  filters: Filters | null;
  setFilters: (filters: Filters | null) => void;
  clearFilters: () => void;
}

/**
 * Custom hook to manage filters state and sync with URL query parameters
 * Follows principle 13: Use the URL for certain state (filters)
 */
export const useFiltersFromUrl = (): UseFiltersFromUrlReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFiltersState] = useState<Filters | null>(null);

  // Load filters from URL on mount (single concern: load from URL)
  useEffect(() => {
    const topic = searchParams.get("topic");
    const style = searchParams.get("style");
    const length = searchParams.get("length");
    const parasha = searchParams.get("parasha");

    if (topic && style && length) {
      const parsedFilters: Filters = {
        topic,
        style,
        length: parseInt(length, 10),
      };

      if (parasha) {
        parsedFilters.parasha = parasha;
      }

      setFiltersState(parsedFilters);
    } else {
      setFiltersState(null);
    }
  }, [searchParams]);

  // Update URL when filters change (single concern: sync to URL)
  const setFilters = useCallback(
    (newFilters: Filters | null) => {
      setFiltersState(newFilters);

      if (newFilters) {
        const params = new URLSearchParams();
        params.set("topic", newFilters.topic);
        params.set("style", newFilters.style);
        params.set("length", newFilters.length.toString());

        if (newFilters.parasha) {
          params.set("parasha", newFilters.parasha);
        }

        setSearchParams(params, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setFiltersState(null);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    setFilters,
    clearFilters,
  };
};


import { useState, useCallback } from "react";
import { Filters } from "../models/filters.model";
import { DvarTorahResult } from "../models/dvarTorah.model";
import { API_BASE_URL, API_ENDPOINTS, TOPIC_VALUES } from "../constants/appConstants";

interface UseDrashaGenerationReturn {
  isLoading: boolean;
  result: DvarTorahResult | null;
  error: Error | null;
  generateDrasha: (filters: Filters) => Promise<void>;
  resetResult: () => void;
}

export const useDrashaGeneration = (): UseDrashaGenerationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DvarTorahResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const generateDrasha = useCallback(async (filters: Filters) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.GENERATE_DRASHA}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Generate title based on filters
      let title = `דבר תורה - ${filters.topic}`;
      if (filters.parasha) {
        title = `דבר תורה לפרשת ${filters.parasha}`;
      }

      const resultToShow: DvarTorahResult = {
        title,
        content: data.result,
      };

      setResult(resultToShow);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error occurred");
      setError(error);
      setResult(null);
      console.error("Error generating D'var Torah:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isLoading,
    result,
    error,
    generateDrasha,
    resetResult,
  };
};


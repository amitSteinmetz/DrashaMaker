import { Filters } from "../models/filters.model";
import { TOPIC_VALUES } from "../constants/appConstants";

/**
 * Extracts filter values from a form element
 */
export const extractFiltersFromForm = (
  form: HTMLFormElement
): Filters => {
  const formData = new FormData(form);
  const filters: Filters = {
    topic: formData.get("topic") as string,
    style: formData.get("style") as string,
    length: parseInt(formData.get("length") as string, 10),
  };

  // Only include parasha if topic is "פרשת שבוע"
  const parasha = formData.get("parasha") as string;
  if (parasha && filters.topic === TOPIC_VALUES.WEEKLY_PARASHA) {
    filters.parasha = parasha;
  }

  return filters;
};

/**
 * Generates a title for the drasha based on filters
 */
export const generateDrashaTitle = (filters: Filters): string => {
  if (filters.parasha) {
    return `דבר תורה לפרשת ${filters.parasha}`;
  }
  return `דבר תורה - ${filters.topic}`;
};


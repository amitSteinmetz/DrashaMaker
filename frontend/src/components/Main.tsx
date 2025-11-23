import React, { useState, useCallback } from "react";
import FiltersPanel from "./FiltersPanel";
import ResultsSection from "./ResultsSection";
import { Filters } from "../models/filters.model";
import ConfirmModal from "./ConfirmModal";
import { useDrashaGeneration } from "../hooks/useDrashaGeneration";
import { useFiltersFromUrl } from "../hooks/useFiltersFromUrl";
import { extractFiltersFromForm } from "../utils/drashaUtils";
import { CONFIRM_MODAL } from "../constants/appConstants";

const Main: React.FC = () => {
  const { isLoading, result, generateDrasha, resetResult } = useDrashaGeneration();
  const { filters: submittedFilters, setFilters } = useFiltersFromUrl();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCreateNew = useCallback(() => {
    setShowConfirmModal(true);
  }, []);

  const handleConfirmCreateNew = useCallback(() => {
    resetResult();
    setFilters(null);
    setShowConfirmModal(false);
  }, [resetResult, setFilters]);

  const handleCancelCreateNew = useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filters = extractFiltersFromForm(e.currentTarget);
    setFilters(filters);

    await generateDrasha(filters);
  }, [generateDrasha, setFilters]);

  return (
    <div className="main-content">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {result ? (
              <ResultsSection
                title={result.title}
                content={result.content}
                filters={submittedFilters}
                onCreateNew={handleCreateNew}
              />
            ) : (
              <FiltersPanel isLoading={isLoading} onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          show={showConfirmModal}
          title={CONFIRM_MODAL.TITLE}
          message={CONFIRM_MODAL.MESSAGE}
          confirmText={CONFIRM_MODAL.CONFIRM_TEXT}
          cancelText={CONFIRM_MODAL.CANCEL_TEXT}
          onConfirm={handleConfirmCreateNew}
          onCancel={handleCancelCreateNew}
        />
      )}
    </div>
  );
};

export default Main;

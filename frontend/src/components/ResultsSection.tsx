import React, { useCallback } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { Filters } from "../models/filters.model";
import {
  RESULTS_ACTIONS,
  RESULTS_ACTION_TITLES,
  NOTIFICATIONS,
  FILE_TYPES,
} from "../constants/appConstants";

type ResultsSectionProps = {
  title: string;
  content: string;
  filters: Filters | null;
  onCreateNew?: () => void;
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
  title,
  content,
  filters,
  onCreateNew,
}) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    alert(NOTIFICATIONS.COPIED_TO_CLIPBOARD);
  }, [content]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content,
      });
    } else {
      handleCopy();
    }
  }, [title, content, handleCopy]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: FILE_TYPES.TEXT_PLAIN });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [content, title]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const metaInfo =
        filters?.topic || filters?.style
          ? `<div class="meta">${
              filters?.topic ? `נושא: ${filters?.topic}` : ""
            } ${filters?.parasha ? `| פרשה: ${filters?.parasha}` : ""} ${
              filters?.style ? `| סגנון: ${filters?.style}` : ""
            }</div>`
          : "";

      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; text-align: right; }
              h1 { color: #0d6efd; }
              .meta { color: #6c757d; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            ${metaInfo}
            <div>${content.replace(/\n/g, "<br>")}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [title, content, filters]);

  return (
    <div className="results-section-container">
      <Card className="shadow-lg border-0 results-card">
        <Card.Header className="bg-success text-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="mb-0 flex-grow-1 w-100 w-md-auto text-center text-md-end">
              {title}
            </h4>
            <ButtonGroup className="flex-shrink-0 justify-content-center w-100 w-md-auto results-buttons">
              <Button
                variant="info"
                size="sm"
                onClick={onCreateNew}
                title={RESULTS_ACTION_TITLES.CREATE_NEW}
              >
                {RESULTS_ACTIONS.CREATE_NEW}
              </Button>

              <Button
                variant="light"
                size="sm"
                onClick={handleCopy}
                title={RESULTS_ACTION_TITLES.COPY}
              >
                {RESULTS_ACTIONS.COPY}
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleShare}
                title={RESULTS_ACTION_TITLES.SHARE}
              >
                {RESULTS_ACTIONS.SHARE}
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleDownload}
                title={RESULTS_ACTION_TITLES.DOWNLOAD}
              >
                {RESULTS_ACTIONS.DOWNLOAD}
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handlePrint}
                title={RESULTS_ACTION_TITLES.PRINT}
              >
                {RESULTS_ACTIONS.PRINT}
              </Button>
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body className="p-5">
          <div className="dvar-torah-content mx-auto">{content}</div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default React.memo(ResultsSection);

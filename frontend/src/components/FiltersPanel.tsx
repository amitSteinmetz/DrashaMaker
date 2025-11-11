import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Loader from "./Loader";
import { TOPICS, PARASHOT, STYLES } from "../utils/hebrewConstants";

interface FiltersPanelProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isLoading, onSubmit }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };

  const showParashaFilter = selectedTopic === "פרשת שבוע";

  return (
    <div className="filters-panel-container">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-3">
          צור דבר תורה מותאם אישית בקליק
        </h2>

        <p className="text-muted">
          {" "}
          wge twejh מחר שבת ועוד אין לך דבר תורה מוכן? הגעת למקום הנכון!
        </p>
        <p className="text-muted">
          בחר נושא וסגנון וצור דבר תורה בהתאם למגוון רחב של פילטרים
        </p>
      </div>

      <Card className="p-4 shadow-lg border-0 filters-card">
        <Form onSubmit={onSubmit}>
          <Row className="g-3 g-md-4 justify-content-center">
            <Col xs={12} sm={10} md={6} lg={5}>
              <Form.Group controlId="topic">
                <Form.Label className="fw-semibold mb-2">נושא</Form.Label>
                <Form.Select
                  name="topic"
                  className="form-select-lg"
                  size="lg"
                  required
                  onChange={handleTopicChange}
                >
                  <option value="">בחר נושא</option>
                  {Object.values(TOPICS).map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {showParashaFilter && (
              <Col xs={12} sm={10} md={6} lg={5}>
                <Form.Group controlId="parasha">
                  <Form.Label className="fw-semibold mb-2">בחר פרשה</Form.Label>
                  <Form.Select
                    name="parasha"
                    className="form-select-lg"
                    size="lg"
                    required
                  >
                    <option value="">בחר פרשה</option>
                    {Object.values(PARASHOT).map((parasha) => (
                      <option key={parasha} value={parasha}>
                        {parasha}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            <Col xs={12} sm={10} md={6} lg={5}>
              <Form.Group controlId="style">
                <Form.Label className="fw-semibold mb-2">סגנון</Form.Label>
                <Form.Select
                  name="style"
                  className="form-select-lg"
                  size="lg"
                  required
                >
                  <option value="">בחר סגנון</option>
                  {Object.values(STYLES).map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4 text-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="px-5 py-2"
              disabled={isLoading}
            >
              {isLoading ? "יוצר..." : "צור דבר תורה"}
            </Button>
          </div>
        </Form>

        {isLoading && <Loader message="יוצר את דבר התורה שלך..." />}
      </Card>
    </div>
  );
};

export default FiltersPanel;

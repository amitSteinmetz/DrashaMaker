import React, { useMemo, useState, useCallback } from "react";
import { Form, Button, Row, Card } from "react-bootstrap";
import Loader from "./Loader";
import Filter from "./Filter";
import { TOPICS, PARASHOT, STYLES, LENGTHS } from "../constants/hebrewConstants";
import { TOPIC_VALUES, DRASHA_LOADER_MESSAGE, CREATE_DRASHA_BUTTON_TEXT, CREATING_DRASHA_TEXT } from "../constants/appConstants";

interface FiltersPanelProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isLoading, onSubmit }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleTopicChange = useCallback((_value: string, label: string) => {
    setSelectedTopic(label);
  }, []);

  const showParashaFilter = useMemo(
    () => selectedTopic === TOPIC_VALUES.WEEKLY_PARASHA,
    [selectedTopic]
  );

  return (
    <div className="filters-panel-container">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-3">
          צור דבר תורה מותאם אישית בקליק
        </h2>

        <p className="text-muted">
          מחר שבת ועוד אין לך דבר תורה מוכן? הגעת למקום הנכון!
        </p>
        <p className="text-muted">בחר נושא וסגנון וצור דבר תורה מותאם עבורך</p>
      </div>

      <Card className="p-4 shadow-lg border-0 filters-card">
        <Form onSubmit={onSubmit}>
          <Row className="g-3 g-md-4 justify-content-center">
            <Filter
              controlId="topic"
              label="נושא"
              name="topic"
              options={TOPICS}
              placeholder="בחר נושא"
              onChange={handleTopicChange}
            />

            {showParashaFilter && (
              <Filter
                controlId="parasha"
                label="בחר פרשה"
                name="parasha"
                options={PARASHOT}
                placeholder="בחר פרשה"
              />
            )}

            <Filter
              controlId="style"
              label="סגנון"
              name="style"
              options={STYLES}
              placeholder="בחר סגנון"
            />

            <Filter
              controlId="length"
              label="אורך"
              name="length"
              options={LENGTHS}
              placeholder="בחר אורך"
            />
          </Row>

          <div className="mt-4 text-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="px-5 py-2"
              disabled={isLoading}
            >
              {isLoading ? CREATING_DRASHA_TEXT : CREATE_DRASHA_BUTTON_TEXT}
            </Button>
          </div>
        </Form>

        {isLoading && <Loader message={DRASHA_LOADER_MESSAGE} className="text-center my-5" />}
      </Card>
    </div>
  );
};

export default React.memo(FiltersPanel);

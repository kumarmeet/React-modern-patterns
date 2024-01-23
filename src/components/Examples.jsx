import React, { useState } from "react";
import TabButton from "./TabButton";
import { EXAMPLES } from "../data";
import { Section } from "./Section";
import { Tabs } from "./Tabs";

export const Examples = () => {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic);
  }

  console.log("APP COMPONENT EXECUTING");

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic]?.title}</h3>
        <p>{EXAMPLES[selectedTopic]?.description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic]?.code}</code>
        </pre>
      </div>
    );
  }

  return (
    <Section
      id="examples"
      title="Examples"
    >
      <Tabs
        buttonContainer="menu"
        buttons={["components", "jsx", "props", "state"].map((topic) => (
          <TabButton
            key={topic}
            isSelected={selectedTopic === topic}
            onClick={() => handleSelect(topic)}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </TabButton>
        ))}
      >
        {tabContent}
      </Tabs>
    </Section>
  );
};

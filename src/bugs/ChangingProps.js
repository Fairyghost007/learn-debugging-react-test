import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Text,
  Box,
  ThumbsRating,
  NameValueList,
  NameValuePair,
} from "grommet";

import Template from "./BugPageTemplate";
import { expect, useBugTest, useBugTestOnce } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <CrimsonCaterpillar
        liked={null}
        level={1}
        attributes={{
          Health: 50,
          Attack: 20,
          Defense: 55,
          "Sp. Attack": 25,
          "Sp. Defense": 25,
          Speed: 30,
          Moves: ["Tackle", "Harden"],
        }}
      />
    </Template>
  );
};

/**
 * Fix issues to catch bug:
 *
 * - Immutability
 * - Changing state vs. props
 * - Changing objects or arrays
 */
const CrimsonCaterpillar = ({ attributes }) => {
  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <LikeButton liked={false} />
      <BugAttributes attributes={attributes} />
    </>
  );
};

const LikeButton = ({ liked }) => {
  const [likeValue, setLikeValue] = useState(liked ? "like" : "dislike");

  const handleOnChange = (event) => {
    const isLiked = event.target.value === "like";
    setLikeValue(isLiked ? "like" : "dislike");
  };

  useBugTest("should be liked", ({ findByTestId }) => {
    expect(findByTestId("liked")).to.have.attr("data-liked", "like");
  });

  return (
    <Box direction="row">
      <ThumbsRating
        name="liked"
        data-test="liked"
        data-liked={likeValue}
        value={likeValue}
        onChange={handleOnChange}
      />
    </Box>
  );
};

function BugAttributes({ attributes }) {
  const [level, setLevel] = useState(1);
  const [currentAttributes, setCurrentAttributes] = useState(attributes);

  const onLevelUp = () => setLevel((prev) => prev + 1);
  const onLevelDown = () => setLevel((prev) => Math.max(1, prev - 1));

  useEffect(() => {
    if (level > 1) {
      const updatedAttributes = Object.fromEntries(
        Object.entries(attributes).map(([key, value]) =>
          typeof value === "number" ? [key, value + (level - 1) * 2] : [key, value]
        )
      );
      setCurrentAttributes(updatedAttributes);
    } else {
      setCurrentAttributes(attributes); // Reset to base attributes at level 1
    }
  }, [level, attributes]);

  useBugTestOnce("should increase stats on level up", ({ findByTestId }) => {
    const health = parseInt(findByTestId("attribute: Health").innerText, 10);
    expect(level).to.be.greaterThan(1);
    expect(health).to.be.above(50);
  });

  useBugTestOnce("should reset stats at level 1", ({ findByTestId }) => {
    const health = parseInt(findByTestId("attribute: Health").innerText, 10);
    expect(level).to.equal(1);
    expect(health).to.equal(50);
  });

  return (
    <Box>
      <Heading level={3}>Attributes</Heading>
      <Box
        direction="row"
        gap="small"
        align="center"
        margin={{ bottom: "medium" }}
      >
        <Text color="text-weak">Level {level}</Text>
        <Button onClick={onLevelDown} disabled={level <= 1} label="level down" />
        <Button primary onClick={onLevelUp} disabled={level >= 100} label="level up" />
      </Box>
      <NameValueList>
        {Object.entries(currentAttributes).map(([key, value]) => (
          <NameValuePair key={key} name={key}>
            <Text color="text-strong" data-test={`attribute: ${key}`}>
              {Array.isArray(value) ? value.join(", ") : value}
            </Text>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
}

export const bug = {
  title: "Changing Props",
  subtitle: "this crimson caterpillar can cause confusion and chaos when trying to modify props or state",
  name: "Crimson Caterpillar",
  price: "$7.99",
  route: "/bug/crimson-caterpillar",
  component: Bug,
};

export default Bug;

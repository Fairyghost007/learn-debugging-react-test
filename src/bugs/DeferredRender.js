import { useCallback, useState, useMemo, Profiler } from "react";
import { Box, Heading, Text, TextInput } from "grommet";
import { FormSearch } from "grommet-icons";

import Template from "./BugPageTemplate";
import { expect, useBugTestOnce } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <DefiantDamselfly />
    </Template>
  );
};

const EMPTY_UPDATES = [];
const SEARCH_ICON = <FormSearch />;

const DefiantDamselfly = () => {
  const [deliveryInput, setDeliveryInput] = useState("");
  const [deliveryUpdates, setDeliveryUpdates] = useState(EMPTY_UPDATES);

  const suggestions = useMemo(
    () =>
      deliveryInput
        ? SEARCH_SUGGESTIONS.filter((ss) =>
            ss.value.toLowerCase().includes(deliveryInput.toLowerCase())
          )
        : SEARCH_SUGGESTIONS,
    [deliveryInput]
  );

  useBugTestOnce(
    "should be able to type 'mosquito' without delay",
    ({ findByTestId }) => {
      expect(deliveryUpdates.length).to.be.gt(5);

      const maxUpdateTime = parseFloat(
        findByTestId("duration").dataset.duration
      );

      expect(deliveryInput).to.equal("mosquito");
      expect(maxUpdateTime).to.be.lt(205);
    }
  );

  const handleProfilerOnRender = useCallback(
    (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      if (phase !== "update") return;

      // Record time between updates
      setDeliveryUpdates((lastUpdates) => {
        const copyUpdates = [...lastUpdates];

        return [
          { startTime, commitTime, delay: commitTime - startTime },
          ...copyUpdates,
        ];
      });
    },
    []
  );

  const handleOnDeliveryInputChange = useCallback((e) => {
    setDeliveryInput(e.target.value);

    if (e.target.value.length < 2) {
      setDeliveryUpdates(EMPTY_UPDATES);
    }
  }, []);

  const handleOnDeliveryInputBlur = useCallback(() => {
    setDeliveryUpdates(EMPTY_UPDATES);
  }, []);

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <UpdateTimeline updates={deliveryUpdates} />
      <Profiler id={bug.name} onRender={handleProfilerOnRender}>
        <TextInput
          icon={SEARCH_ICON}
          placeholder="enter address"
          suggestions={suggestions}
          value={deliveryInput}
          onChange={handleOnDeliveryInputChange}
          onBlur={handleOnDeliveryInputBlur}
        />
      </Profiler>
    </>
  );
};

function AddressLabel({ address }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 50) {
    // Do nothing for 50 ms to emulate extremely slow code
  }

  return <Text>{address}</Text>;
}

function UpdateTimeline({ updates }) {
  const maxUpdateTime = updates.reduce((acc, next) => {
    if (next.delay >= acc) return next.delay;
    return acc;
  }, 0);

  return (
    <Box direction="row" gap="xsmall" margin={{ bottom: "medium" }}>
      <Text>Max Delay Between Commits:</Text>
      {isNaN(maxUpdateTime) ? (
        <Text color="text-weak">Unknown</Text>
      ) : (
        <Text
          data-test="duration"
          data-duration={maxUpdateTime}
          color={maxUpdateTime > 205 ? "red" : "green"}
        >
          {maxUpdateTime.toFixed(1)}ms
        </Text>
      )}
    </Box>
  );
}

export const bug = {
  title: "Deferred Render",
  subtitle:
    "this defiant damselfly can cause your components to take longer to render",
  name: "Defiant Damselfly",
  price: "$35.99",
  route: "/bug/deferred",
  component: Bug,
};

export default Bug;

const SEARCH_SUGGESTIONS = [
  {
    label: <AddressLabel address="1254 Antenna Lane NW" />,
    value: "1254 Antenna Lane NW",
  },
  {
    label: <AddressLabel address="784 Butterfly Boulevard SE" />,
    value: "784 Butterfly Boulevard SE",
  },
  {
    label: <AddressLabel address="459 Spiderweb Way NE" />,
    value: "459 Spiderweb Way NE",
  },
  {
    label: <AddressLabel address="378 Ladybug Drive SW" />,
    value: "378 Ladybug Drive SW",
  },
  {
    label: <AddressLabel address="827 Firefly Path NW" />,
    value: "827 Firefly Path NW",
  },
  {
    label: <AddressLabel address="356 Dragonfly Avenue NE" />,
    value: "356 Dragonfly Avenue NE",
  },
  {
    label: <AddressLabel address="1001 Grasshopper Grove SW" />,
    value: "1001 Grasshopper Grove SW",
  },
  {
    label: <AddressLabel address="270 Beetle Bend NW" />,
    value: "270 Beetle Bend NW",
  },
  {
    label: <AddressLabel address="820 Moth Mews SE" />,
    value: "820 Moth Mews SE",
  },
  {
    label: <AddressLabel address="934 Caterpillar Court NE" />,
    value: "934 Caterpillar Court NE",
  },
  {
    label: <AddressLabel address="290 Locust Lane SW" />,
    value: "290 Locust Lane SW",
  },
  {
    label: <AddressLabel address="751 Hornet Highway NE" />,
    value: "751 Hornet Highway NE",
  },
  {
    label: <AddressLabel address="322 Mosquito Meadow NW" />,
    value: "322 Mosquito Meadow NW",
  },
  {
    label: <AddressLabel address="684 Flea Field SE" />,
    value: "684 Flea Field SE",
  },
  {
    label: <AddressLabel address="852 Cricket Crescent NW" />,
    value: "852 Cricket Crescent NW",
  },
  {
    label: <AddressLabel address="510 Bee Bypass NE" />,
    value: "510 Bee Bypass NE",
  },
  {
    label: <AddressLabel address="839 Mantis Manor SE" />,
    value: "839 Mantis Manor SE",
  },
  {
    label: <AddressLabel address="390 Aphid Alley SW" />,
    value: "390 Aphid Alley SW",
  },
  {
    label: <AddressLabel address="577 Termite Terrace NW" />,
    value: "577 Termite Terrace NW",
  },
  {
    label: <AddressLabel address="305 Tick Trail NE" />,
    value: "305 Tick Trail NE",
  },
  {
    label: <AddressLabel address="251 Larva Lane SE" />,
    value: "251 Larva Lane SE",
  },
  {
    label: <AddressLabel address="112 Earwig End SW" />,
    value: "112 Earwig End SW",
  },
  {
    label: <AddressLabel address="440 Silkworm Street NW" />,
    value: "440 Silkworm Street NW",
  },
  {
    label: <AddressLabel address="930 Centipede Circle NE" />,
    value: "930 Centipede Circle NE",
  },
  {
    label: <AddressLabel address="624 Maggot Meadow SW" />,
    value: "624 Maggot Meadow SW",
  },
  {
    label: <AddressLabel address="712 Mayfly Mews NW" />,
    value: "712 Mayfly Mews NW",
  },
  {
    label: <AddressLabel address="297 Roach Road NE" />,
    value: "297 Roach Road NE",
  },
  {
    label: <AddressLabel address="365 Snail Street SW" />,
    value: "365 Snail Street SW",
  },
  {
    label: <AddressLabel address="408 Wasp Way NW" />,
    value: "408 Wasp Way NW",
  },
  {
    label: <AddressLabel address="980 Bumblebee Boulevard NE" />,
    value: "980 Bumblebee Boulevard NE",
  },
  {
    label: <AddressLabel address="127 Caddisfly Crescent SW" />,
    value: "127 Caddisfly Crescent SW",
  },
  {
    label: <AddressLabel address="648 Damselfly Drive NW" />,
    value: "648 Damselfly Drive NW",
  },
  {
    label: <AddressLabel address="810 Stickbug Street NE" />,
    value: "810 Stickbug Street NE",
  },
  {
    label: <AddressLabel address="741 Pupa Path SW" />,
    value: "741 Pupa Path SW",
  },
  {
    label: <AddressLabel address="690 Scarab Square NW" />,
    value: "690 Scarab Square NW",
  },
  {
    label: <AddressLabel address="202 Chrysalis Court NE" />,
    value: "202 Chrysalis Court NE",
  },
  {
    label: <AddressLabel address="880 Nymph Nook SW" />,
    value: "880 Nymph Nook SW",
  },
  {
    label: <AddressLabel address="777 Worm Way NW" />,
    value: "777 Worm Way NW",
  },
  {
    label: <AddressLabel address="431 Spider Street SW" />,
    value: "431 Spider Street SW",
  },
];

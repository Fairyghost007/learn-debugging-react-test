import { useCallback, useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";

import Template from "./BugPageTemplate";
import { expect, useBugTest } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <DapperDragonfly />
    </Template>
  );
};

const DapperDragonfly = () => {
  const [price, setPrice] = useState(bug.price);

  const recalculatePrice = useCallback((qty) => {
    const amount = parseCurrencyAsAmount(bug.price);
    const newAmount = qty * amount;
    const newPrice = formatAsCurrency(newAmount);
    setPrice(newPrice);
  }, []);

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <Text size="large" weight="bold">
        {price}
      </Text>
      <QuantityPicker
        initialQuantity={1}
        onQuantityChange={recalculatePrice}
        price={price}
      />
    </>
  );
};

function QuantityPicker({ initialQuantity = 1, price, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Update the price whenever the quantity changes
  useEffect(() => {
    onQuantityChange(quantity);
  }, [onQuantityChange, quantity]);

  useBugTest("should be able to update quantity to 10", ({ findByTestId }) => {
    // Testing for the quantity to be able to reach 10
    const quantityText = findByTestId("quantity").innerText;
    expect(parseInt(quantityText, 10)).to.be.gte(10);
  });

  return (
    <Box>
      <Box
        direction="row"
        gap="small"
        align="center"
        margin={{ bottom: "medium" }}
      >
        <Button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
          icon={<SubtractCircle />}
        />
        <Text color="text-weak" data-test="quantity">
          {quantity}
        </Text>
        <Button
          primary
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= 100}
          icon={<AddCircle />}
        />
      </Box>
    </Box>
  );
}

function formatAsCurrency(amount) {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function parseCurrencyAsAmount(currency) {
  // Removing currency formatting and returning amount in cents
  return Math.round(Number(currency.replace(/[^0-9.-]+/g, "")) * 100);
}

export const bug = {
  title: "Delayed Render",
  subtitle:
    "this dapper dragonfly can cause your components to take longer to render",
  name: "Dapper Dragonfly",
  price: "$35.99",
  route: "/bug/delayed",
  component: Bug,
};

export default Bug;

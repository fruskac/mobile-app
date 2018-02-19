import "react-native";
import React from "react";
import BackButton from "../../src/components/BackButton/BackButton";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<BackButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

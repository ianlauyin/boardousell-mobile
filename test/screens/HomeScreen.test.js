import HomeScreen from "../../src/screens/HomeScreen";
import TestRenderer from "react-test-renderer";

describe("screens/HomeScreen", () => {
  it.skip("show Home", () => {
    const screen = TestRenderer.create(<HomeScreen />);
    const instance = screen.root;
    const homeText = instance.findByType("Text").props.children;
    expect(homeText).toEqual("Home");
  });
});

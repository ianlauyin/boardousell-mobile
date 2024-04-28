import HomeScreen from "../../src/screens/HomeScreen";
import TestRenderer from "react-test-renderer";

describe("screens/HomeScreen", () => {
  it.skip("show Home", () => {
    const component = TestRenderer.create(<HomeScreen />);
    const instance = component.root;
    const homeText = instance.findByType("Text").props.children;
    expect(homeText).toEqual("Home");
  });
});

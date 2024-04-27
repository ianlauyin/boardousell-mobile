import NoticeSlides from "../../src/components/Notice/NoticeSlides";
import TestRenderer from "react-test-renderer";

describe("screens/NoticeSlides", () => {
  it.skip("show Home", () => {
    const screen = TestRenderer.create(<NoticeSlides />);
    const instance = screen.root;
    const homeText = instance.findByType("Text").props.children;
    expect(homeText).toEqual("Home");
  });
});

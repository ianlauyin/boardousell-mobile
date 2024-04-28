import NoticeSlidesPage from "../../src/components/Notice/NoticeSlidesPage";
import { create, act } from "react-test-renderer";
import defaultImage from "../../src/components/Notice/img/notice-default.png";

describe("screens/NoticeSlidesPage", () => {
  const mockNoticeWithoutURL = { title: "Notice title" };
  const mockNotice = {
    title: "Notice title",
    ...mockNoticeWithoutURL,
  };
  let instance;

  const component = create(<NoticeSlidesPage notice={mockNotice} />);
  instance = component.root;

  it("Will show Title even the image haven't been loaded", () => {
    const titleElement = instance.findByType("Text");
    expect(titleElement.props.children).toEqual(mockNotice.title);
  });

  it("Will have a image have url given notice.url", () => {
    const imageElement = instance.findByType("Image");
    expect(imageElement.props.source.uri).toEqual(mockNotice.url);
  });

  it("Will show a Activity when the photos haven't been loaded", () => {
    const loadingIndicator = instance.findByType("ActivityIndicator");
    expect(loadingIndicator).toBeTruthy();
  });

  it("Will no longer show Activity after image is loaded", () => {
    act(() => instance.findByType("Image").props.onLoadEnd());
    const updatedLoadingIndicator = instance.findAllByType("ActivityIndicator");
    expect(updatedLoadingIndicator.length).toBe(0);
  });

  it("Will have a default image if no url", () => {
    const componentWithoutURL = create(
      <NoticeSlidesPage notice={mockNoticeWithoutURL} />
    );
    instanceWithoutURL = componentWithoutURL.root;
    const imageElementWithoutURL = instance.findByType("Image");
    expect(imageElementWithoutURL.props.source).toEqual(defaultImage);
  });
});

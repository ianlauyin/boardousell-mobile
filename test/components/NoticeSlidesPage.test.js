import React from "react";
import { act, render, screen } from "@testing-library/react-native";
import NoticeSlidesPage from "../../src/components/Notice/NoticeSlidesPage";
import defaultImage from "../../src/components/Notice/img/notice-default.png";

describe("screens/NoticeSlidesPage", () => {
  const mockNoticeWithoutURL = { title: "Notice title" };
  const mockNotice = {
    url: "http://localhost",
    ...mockNoticeWithoutURL,
  };

  it("Will show Title even the image haven't been loaded", async () => {
    render(<NoticeSlidesPage notice={mockNotice} />);
    const title = await screen.findByText(mockNotice.title);
    expect(title).toBeTruthy();
  });

  it("Will have an image with the URL given notice.url", async () => {
    render(<NoticeSlidesPage notice={mockNotice} />);
    const image = screen.getByTestId("notice-image");
    expect(image.props.source).toMatchObject({ uri: mockNotice.url });
  });

  it("Will show an Activity when the photos haven't been loaded", async () => {
    render(<NoticeSlidesPage notice={mockNotice} />);
    const activityIndicator = screen.getByTestId("notice-activity-indicator");
    expect(activityIndicator).toBeTruthy();
  });

  it("Will no longer show Activity after the image is loaded", async () => {
    render(<NoticeSlidesPage notice={mockNotice} />);
    const image = screen.getByTestId("notice-image");
    await act(async () => await image.props.onLoadEnd());
    const activityIndicator = screen.queryByTestId("notice-activity-indicator");
    expect(activityIndicator).toBeNull();
  });

  it("Will have a default image if no URL", async () => {
    render(<NoticeSlidesPage notice={mockNoticeWithoutURL} />);
    const image = screen.getByTestId("notice-image");
    expect(image.props.source).toEqual(defaultImage);
  });
});

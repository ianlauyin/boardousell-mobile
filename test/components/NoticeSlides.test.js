import axios from "axios";
import { act, render, screen } from "@testing-library/react-native";
import NoticeSlides from "../../src/components/Notice/NoticeSlides";
import React from "react";

jest.mock("axios");

describe("component/NoticeSlides", () => {
  let useEffect;
  const mockUseEffect = jest.spyOn(React, "useEffect");
  mockUseEffect.mockImplementation((effect) => {
    useEffect = effect;
  });
  it("renders loading indicator initially", () => {
    render(<NoticeSlides />);
    const activityIndicator = screen.getByTestId("slides-activity-indicator");
    expect(activityIndicator).toBeTruthy();
  });

  it.skip("displays notices after data fetch", async () => {
    const mockNotices = [
      { id: 1, title: "Notice 1" },
      { id: 2, title: "Notice 2" },
    ];
    await jest.spyOn(axios, "get").mockResolvedValue({ data: mockNotices });
    render(<NoticeSlides />);
    await act(async () => await useEffect());
    expect(screen.getByTestId(mockNotices[0].id)).toBeTruthy();
    expect(screen.getByTestId(mockNotices[1].id)).toBeTruthy();
    expect(screen.queryByTestId("slides-activity-indicator")).toBeNull();
  });
});

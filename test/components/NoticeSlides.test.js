import axios from "axios";
import { act, render, screen } from "@testing-library/react-native";
import NoticeSlides from "../../src/components/Notice/NoticeSlides";
import React from "react";
import showError from "../../src/utils/showError";

jest.mock("axios");
jest.mock("../../src/utils/showError");

describe("component/NoticeSlides", () => {
  let useEffect;
  const mockUseEffect = jest.spyOn(React, "useEffect");
  mockUseEffect.mockImplementation((effect) => {
    useEffect = effect;
  });
  const triggerUseEffect = async () => {
    await act(async () => await useEffect());
  };

  afterAll(() => {
    mockUseEffect.mockRestore();
  });

  it("renders loading indicator initially", () => {
    render(<NoticeSlides />);
    const activityIndicator = screen.getByTestId("slides-activity-indicator");
    expect(activityIndicator).toBeTruthy();
  });

  it("displays notices after data fetch", async () => {
    const mockNotices = [
      { id: 1, title: "Notice 1" },
      { id: 2, title: "Notice 2" },
    ];
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockNotices });
    render(<NoticeSlides />);
    await triggerUseEffect();
    expect(screen.UNSAFE_getByProps({ notice: mockNotices[0] })).toBeTruthy();
    expect(screen.UNSAFE_getByProps({ notice: mockNotices[1] })).toBeTruthy();
    expect(screen.queryByTestId("slides-activity-indicator")).toBeNull();
  });

  it("will called showError when request is rejected", async () => {
    const errorMessage = "error message";
    jest.spyOn(axios, "get").mockRejectedValue(new Error(errorMessage));
    render(<NoticeSlides />);
    await triggerUseEffect();
    expect(showError).toHaveBeenCalledWith(
      errorMessage,
      "Cannot load notices, Please try again later."
    );
  });

  it("will not show ActicityIndicator and Notices if request is reject", async () => {
    await jest.spyOn(axios, "get").mockRejectedValue(new Error("error"));
    render(<NoticeSlides />);
    await triggerUseEffect();
    expect(screen.queryByTestId("slides-activity-indicator")).toBeNull();
    expect(screen.UNSAFE_queryByType("PagerView")).toBeNull();
  });
});

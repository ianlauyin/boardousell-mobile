import axios from "axios";
import NoticeSlides from "../../src/components/Notice/NoticeSlides";
import { create, act } from "react-test-renderer";
import React from "react";

jest.mock("axios");

describe.skip("component/NoticeSlides", () => {
  let component;
  let useEffect;

  const mockUseEffect = jest.spyOn(React, "useEffect");
  mockUseEffect.mockImplementation((effect) => {
    useEffect = effect;
  });

  beforeEach(() => {
    act(() => {
      component = create(<NoticeSlides />);
    });
  });
  it("renders loading indicator initially", () => {
    expect(component.root.findByType("ActivityIndicator")).toBeTruthy();
  });

  it("displays notices after data fetch", async () => {
    const mockNotices = [
      { id: 1, title: "Notice 1" },
      { id: 2, title: "Notice 2" },
    ];
    axios.get.mockResolvedValue({ data: mockNotices });
    await act(async () => await useEffect());
    expect(component.root.findByProps({ notice: mockNotices[0] })).toBeTruthy();
    expect(component.root.findByProps({ notice: mockNotices[1] })).toBeTruthy();
  });
});

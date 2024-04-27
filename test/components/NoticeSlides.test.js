import axios from "axios";
import NoticeSlides from "../../src/components/Notice/NoticeSlides";
import TestRenderer, { act } from "react-test-renderer";

jest.mock("axios");

describe("NoticeSlides", () => {
  it("should make only one API call", async () => {
    const checkAPICall = jest.spyOn(axios, "get");
    await act(() => TestRenderer.create(<NoticeSlides />));
    expect(checkAPICall).toHaveBeenCalledTimes(1);
  });
});

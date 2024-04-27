import { Alert } from "react-native";
import showError from "../../src/utils/showError";

jest.mock("react-native", () => ({ Alert: { alert: jest.fn() } }));
describe("utils/showError", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const defaultTitle = "Error";
  const defaultMessage = "Please try again later.";
  const testTitle = "Network Error";
  const testMessage = "Cannot load data";
  const button = [{ text: "OK" }, { text: "Cancel" }];
  it("Alert should called once with title, message, and buttons", () => {
    showError(testTitle, testMessage);
    expect(Alert.alert).toHaveBeenCalledWith(testTitle, testMessage, button);
  });

  it("Alert will have default Title with no title args", () => {
    showError(undefined, testMessage);
    expect(Alert.alert).toHaveBeenCalledWith(defaultTitle, testMessage, button);
  });

  it("Alert will have default Message with no message args", () => {
    showError(testTitle, undefined);
    expect(Alert.alert).toHaveBeenCalledWith(testTitle, defaultMessage, button);
  });

  it("Alert will have default title and Message with no title and message args", () => {
    showError(undefined, undefined);
    expect(Alert.alert).toHaveBeenCalledWith(
      defaultTitle,
      defaultMessage,
      button
    );
  });
});

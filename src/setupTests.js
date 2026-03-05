const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

jest.mock("react-native-i18n", () => ({
  t: key => key,
  locale: "en",
  currentLocale: () => "en"
}));

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

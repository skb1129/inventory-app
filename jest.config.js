process.env.TZ = "UTC";

module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: ["regenerator-runtime/runtime", "@testing-library/react/dont-cleanup-after-each"],
};

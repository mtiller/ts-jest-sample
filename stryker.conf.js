module.exports = function(config) {
  config.set({
    mutator: "typescript",
    testRunner: "jest",
    packageManager: "yarn",
    reporters: ["clear-text", "progress"],
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    mutate: ["src/**/*.ts"],
  });
};

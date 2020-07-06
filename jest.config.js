module.exports = {
  roots: ['src'],
  transform: { '\\.ts$': ['ts-jest'] },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coveragePathIgnorePatterns: ['dto', 'routes', 'secureRoutes', 'swagger', 'index'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "나만의API",
      version: "3.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};

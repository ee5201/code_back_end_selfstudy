export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StarBucks',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.swagger.js'], // files containing annotations as above
};

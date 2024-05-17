const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Place Pulse",
      version: "1.0.0",
      description:
        "Backend Service for accommodations advertisement and booking system",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

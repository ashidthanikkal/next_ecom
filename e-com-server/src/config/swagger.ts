import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "E-commerce API",
        version: "1.0.0",
        description: "API documentation for the e-commerce project",
      },
      servers: [
        {
          url: "http://localhost:5000", // change for production
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    //   security: [
    //     {
    //       bearerAuth: [],
    //     },
    //   ],
    },
    apis: ["./src/routes/*.ts"], // path to your route files
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

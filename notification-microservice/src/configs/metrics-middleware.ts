const promBundle = require("express-prom-bundle");

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { 
        project_name: 'Todo List React & Node.js - Notification Microservice', 
        application: 'Todo List React & Node.js Notification Microservice Application',
    },
    promClient: {
        collectDefaultMetrics: {
        }
    }
});

export { metricsMiddleware };
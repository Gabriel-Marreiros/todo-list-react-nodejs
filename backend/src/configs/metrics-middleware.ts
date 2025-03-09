const promBundle = require("express-prom-bundle");

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { 
        project_name: 'Todo List React & Node.js - Backend', 
        application: 'Todo List React & Node.js Backend Application',
    },
    promClient: {
        collectDefaultMetrics: {
        }
    }
});

export { metricsMiddleware };
const mongoDbConfig = {
    mongodbHost: process.env.MONGODB_HOST!,
    mongodbPort: process.env.MONGODB_PORT!,
    mongodbUser: process.env.MONGODB_USER!,
    mongodbPassword: process.env.MONGODB_PASSWORD!,
    mongodbDatabase: process.env.MONGODB_DATABASE!
}

export { mongoDbConfig };
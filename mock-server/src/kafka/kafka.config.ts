const KAFKA_BROKER_URL: string = process.env.KAFKA_BROKER_URL || "localhost:9092";
const KAFKA_CLIENT_ID: string = process.env.KAFKA_CLIENT_ID || "mock-server";
const KAFKA_SASL_MECHANISM: string= process.env.KAFKA_SASL_MECHANISM||"plain"
const KAFKA_SASL_USERNAME: string = process.env.KAFKA_SASL_USERNAME || "admin";
const KAFKA_SASL_PASSWORD: string = process.env.KAFKA_SASL_PASSWORD || "admin-secret";

enum mech {
    plain="plain",
    aws  = "aws",
    [`scram-sha-256`]="scram-sha-256",
    [`scram-sha-512`]="scram-sha-512",
    oauthbearer="oauthbearer"
}

export const config = {
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_BROKER_URL],
    sasl: {
        mechanism: mech[KAFKA_SASL_MECHANISM],
        username: KAFKA_SASL_USERNAME,
        password: KAFKA_SASL_PASSWORD
      }
}
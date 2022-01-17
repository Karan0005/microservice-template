const DAPR = {
  endpoint: 'http://localhost:3600',
  apiVersion: 'v1.0',
  secretManagerEndpoint: 'secrets/awssecretmanager/',
  healthEndpoint: 'healthz',
  pubsubEndpoint: 'publish/pubsub/'
};

export const DAPR_ENDPOINTS = {
  secretVaultURL: DAPR.endpoint + '/' + DAPR.apiVersion + '/' + DAPR.secretManagerEndpoint,
  pubsubURL: DAPR.endpoint + '/' + DAPR.apiVersion + '/' + DAPR.pubsubEndpoint,
  healthCheckURL: DAPR.endpoint + '/' + DAPR.apiVersion + '/' + DAPR.healthEndpoint
};

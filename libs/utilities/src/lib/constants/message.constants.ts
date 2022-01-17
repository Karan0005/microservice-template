export const BaseMessage = {
  ServerStartUp: 'Appplication Started on Port Number :: ',
  Error: 'Internal Server Error',
  Success: 'Success',
  RequestProcessed: 'Request Processed Successfully'
};

export const SwaggerMessage = {
  Property: {
    Description: {
      IsSuccess: 'Response Status',
      Message: 'Response Message',
      Data: 'Entity Response',
      Errors: 'Response Errors if Any'
    }
  },
  Response: {
    OK: {
      Status: 200,
      Description: 'Success Response'
    },
    SERVICE_UNAVAILABLE: {
      Status: 503,
      Description: 'Service Unavailable Response'
    }
  }
};

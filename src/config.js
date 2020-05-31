export default {
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'content-life-ideas-upload-tests',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://wpt18x31i9.execute-api.us-east-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_ZLRqGcpiP',
    APP_CLIENT_ID: '334lv23nl443oa3q4tijgrg9s8',
    IDENTITY_POOL_ID: 'us-east-1:213ed2de-cd71-4115-ba57-04674f18bb89',
  },
  MAX_ATTACHMENT_SIZE: 5000000,
};

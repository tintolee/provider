// import awsAppConfig from "./aws-exports";

//Provider Portal config for develop env
const awsAppConfigDevelop = {
  aws_project_region: 'eu-west-1',
  aws_cognito_identity_pool_id:
    'eu-west-1:f3929b4d-b40b-4cea-a85b-b41ace3c5f46',
  aws_cognito_region: 'eu-west-1',
  aws_user_pools_id: 'eu-west-1_Nbwote3TJ',
  aws_user_pools_web_client_id: '2ubbgtbas91068ja43l0sb9t0c',
  oauth: {},
  aws_appsync_graphqlEndpoint:
    'https://6dcabl2txbhpfmmh7uctlh6vxa.appsync-api.eu-west-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_user_files_s3_bucket:
    'cm2provider112c74238af64c2ca6103796fed33fd5190632-develop',
  aws_user_files_s3_bucket_region: 'eu-west-1',
};

export default awsAppConfigDevelop;

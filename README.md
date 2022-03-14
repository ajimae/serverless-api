# DynamoDB CRUD API using API Gateway and AWS Lambda | Nodejs with AWS-SDK V3 and Serverless Framework

### Commands
: initialize and configure aws credentials - `aws configure`
: install dynamodb - `serverless plugin install --name serverless-dynamodb-local`
: start local dynamodb - `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb` (cd into local dynamodb directory)
: list dynamodb tables - `aws dynamodb list-tables --endpoint-url http://localhost:8000`

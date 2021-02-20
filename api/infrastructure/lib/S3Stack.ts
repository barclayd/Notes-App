import * as s3 from '@aws-cdk/aws-s3';
import { HttpMethods } from '@aws-cdk/aws-s3';
import * as sst from '@serverless-stack/resources';

export default class S3Stack extends sst.Stack {
  private bucket: s3.Bucket;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'Uploads', {
      cors: [
        {
          maxAge: 3000,
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          allowedMethods: Object.values(HttpMethods),
        },
      ],
    });
  }
}

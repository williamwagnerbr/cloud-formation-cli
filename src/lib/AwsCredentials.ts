interface IAwsCredentials {
  key: string;
  secret: string;
  regions: string[];
}

class AwsCredentials implements IAwsCredentials {

  key: string;
  secret: string;
  regions: string[];

  validate = function () : boolean {
    return true;
  }
}

export {
  IAwsCredentials,
  AwsCredentials
};

export default AwsCredentials
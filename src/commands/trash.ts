import { GluegunToolbox } from 'gluegun';
//import AwsCredentials from '../lib/AwsCredentials';
//import { IAwsCredentials, AwsCredentials } from '../lib/AwsCredentials';
//import * as cfn from 'cfn';
import CloudFormation from '../lib/CloudFormation';
//import AwsCli from '../lib/AwsCli';

interface Resource {
  name: string;
  type: string;
  properties: any;
}

interface CloudStack {
  name: string;
  resources: Resource[];
}

interface ProviderCredentials {

}

interface Provider {
  name: string;
  credentials: ProviderCredentials;
}

interface AwsCredentials extends ProviderCredentials {
  accessKeyId: string;
  accessSecretKey: string;
  regions: string[];
}

interface AwsProvider extends Provider {
  name: string;
  credentials: AwsCredentials;
}

interface DeployOptions {
  provider: Provider;
  stack: CloudStack;
}

function baseResolver () {
  let provider : Provider = null;
    let resourceList : Resource[] = [];

    let credentials : AwsCredentials = {
      accessKeyId: 'xxxx',
      accessSecretKey: 'xxxxx',
      regions: ['us-east-1']
    };

    let awsProvider : AwsProvider = {
      name: 'aws',
      credentials: credentials
    }

    provider = awsProvider;

    let resourceOptions : Resource = {
      name: 'MyDB',
      type: 'AWS::DbInstance:MySQL',
      properties: {
        aaaa: 'bbbb'
      }
    };

    resourceList.push(resourceOptions);

    let options : DeployOptions = {
      provider: provider,
      stack: {
        name: 'zzxz',
        resources: resourceList
      }
    };

    console.log(JSON.stringify(options, null, 2));

    /*
    if (process.env.AWS_ACCESS_KEY_ID) {
      awsCredentials.key = process.env.AWS_ACCESS_KEY_ID;
    }

    if (process.env.AWS_SECRET_ACCESS_KEY) {
      awsCredentials.secret = process.env.AWS_SECRET_ACCESS_KEY;
    }

    if (process.env.AWS_DEFAULT_REGION) {
      awsCredentials.regions = [ process.env.AWS_DEFAULT_REGION ];
    }
    
    if (parameters.options.awsAccessKeyId) {
      awsCredentials.key = parameters.options.awsAccessKeyId;
    }

    if (parameters.options.awsAccessSecretKey) {
      awsCredentials.secret = parameters.options.awsAccessSecretKey;
    }

    if (parameters.options.awsRegions) {
      awsCredentials.regions = parameters.options.awsRegions.split(',');
    }

    if (!awsCredentials.validate()) {
      return toolbox.print.error('Invalid AWS credentials');
    }

    console.log(awsCredentials);
    
    if (!parameters.options.file) {
      return toolbox.print.error("Stack file path not defined");
    }
    */

    /*
    await generate({
      template: 'model.js.ejs',
      target: `models/${name}-model.js`,
      props: { name }
    })
    */

}

module.exports = {
  name: 'trash',
  //alias: ['t'],
  run: async (toolbox: GluegunToolbox) => {
    /*
    const {
      parameters,
      print: { info }
    } = toolbox
    */
    //const name = parameters.first;
    console.log(baseResolver);

    // aws cloudformation --region us-east-1 describe-stacks --stack-name testing-cf-stack-v2

    let profileOptions = {
      region: 'us-east-1',
      accessKeyId: 'xxxx',
      secretAccessKey: 'xxxxxx'
    };

    let stackOptions = {
      name: 'testing-cf-stack-v2',
      ...profileOptions
    };

    ///let profileOutput = await AwsCli.configure(profileOptions);
    //console.log(profileOutput);

    let stackOuput = await CloudFormation.getOutputs(stackOptions);
    //let stackOuput = await cfn.output(stackOptions);

    console.log(JSON.stringify(stackOuput, null, 2));
    toolbox.print.info(`All right!`);
  }
}

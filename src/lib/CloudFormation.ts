const { exec } = require('child_process');

interface StackOptions {
  name: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export default {
  getOutputs: async function (options: StackOptions) {
    return new Promise(function (resolve, reject) {
      let cmdArgs = [];

      if (options.region) {
        cmdArgs.push(`--region ${options.region}`);
      }

      let execOptions:any = {
        env: {}
      };

      if (options.accessKeyId) {
        execOptions.env.AWS_ACCESS_KEY_ID = options.accessKeyId;
        execOptions.env.AWS_SECRET_ACCESS_KEY = options.secretAccessKey;
      }

      exec(`aws cloudformation ${cmdArgs.join(' ')} describe-stacks --stack-name ${options.name}`, execOptions, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }

        if (stdout) {
          let output = JSON.parse(stdout);
          
          if (output.Stacks) {
            return resolve(output.Stacks);
          }

          return reject(new Error(output.toString()));
        }

        resolve(stderr);
      });
    });
  }
}
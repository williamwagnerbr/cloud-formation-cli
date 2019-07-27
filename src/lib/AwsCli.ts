const { exec } = require('child_process');

interface ProfileOptions {
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export default {
  configure: async function (profileOptions: ProfileOptions) {
    let commands = [];
    let propsMap = {
      'accessKeyId': 'aws_access_key_id',
      'secretAccessKey': 'aws_secret_access_key'
    };

    let profile = 'teewe';

    Object.entries(profileOptions).forEach(function ([key, value]) {
      let name = propsMap[key] || key;
      commands.push(`aws configure set ${name} ${value} --profile ${profile}`);
    });

    return new Promise(function (resolve, reject) {
      exec(commands.join(' && '), function (err, stdout, stderr) {
        if (err) {
          return reject(err);
        }

        if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  },
  removeProfile: async function (name: string) {
    // Code here
  }
}
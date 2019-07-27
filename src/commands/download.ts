import { GluegunToolbox } from 'gluegun'
import CloudFormation from '../lib/CloudFormation';

module.exports = {
  name: 'download',
  //alias: ['d'],
  run: async (toolbox: GluegunToolbox) => {
    let commandOptions: any = {
      stack: '',
      stage: 'production',
      output: 'aws-stack-info.json'
    }

    if (toolbox.filesystem.exists('aws-stack-lock.json')) {
      let stackConfig = JSON.parse(toolbox.filesystem.read('aws-stack-lock.json'));
      
      if (stackConfig.name) {
        commandOptions.stack = stackConfig.name;
      }

      if (stackConfig.defaultStage) {
        commandOptions.stage = stackConfig.defaultStage;
      }
    }

    if (toolbox.parameters.options.stack) {
      commandOptions.stack = toolbox.parameters.options.stack;
    }

    if (!commandOptions.stack) {
      return toolbox.print.error('Stack name not given');
    }

    let profileOptions : any = {};

    if (toolbox.parameters.options.region) {
      profileOptions.region = toolbox.parameters.options.region;
    }

    if (toolbox.parameters.options.accessKeyId) {
      profileOptions.accessKeyId = toolbox.parameters.options.accessKeyId;
    }

    if (toolbox.parameters.options.secretAccessKey) {
      profileOptions.secretAccessKey = toolbox.parameters.options.secretAccessKey;
    }

    if (toolbox.parameters.options.stage) {
      commandOptions.stage = toolbox.parameters.options.stage;
    }

    if (toolbox.parameters.options.output) {
      commandOptions.output = toolbox.parameters.options.output;
    }

    let stackOptions = {
      name: commandOptions.stack,
      ...profileOptions
    };

    toolbox.print.info(`Downloading stack info for "${commandOptions.stack}" (${commandOptions.stage})...`);
    let stackOuput = await CloudFormation.getOutputs(stackOptions);
    toolbox.filesystem.write(commandOptions.output, JSON.stringify(stackOuput, null, 2));
    toolbox.print.info(`Saved at: ${toolbox.filesystem.path(commandOptions.output)}`);
  }
}

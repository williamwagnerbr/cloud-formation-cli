import { GluegunToolbox } from 'gluegun';
//import * as cfn from 'cfn';
//import CloudFormation from '../lib/CloudFormation';

module.exports = {
  name: 'deploy',
  alias: ['d'],
  run: async (toolbox: GluegunToolbox) => {
    let commandOptions : any = {};

    if (toolbox.parameters.options.name) {
      commandOptions.stack = toolbox.parameters.options.name;
    }

    if (toolbox.parameters.options.region) {
      commandOptions.region = toolbox.parameters.options.region;
    }

    if (toolbox.parameters.options.accessKeyId) {
      commandOptions.accessKeyId = toolbox.parameters.options.accessKeyId;
    }

    if (toolbox.parameters.options.secretAccessKey) {
      commandOptions.secretAccessKey = toolbox.parameters.options.secretAccessKey;
    }

    // CFN -> update
    //let stackOuput = await CloudFormation.getOutputs(commandOptions);
    
    toolbox.print.info(`All right!`);
  }
}

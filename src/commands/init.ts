import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'init',
  alias: ['i'],
  run: async (toolbox: GluegunToolbox) => {
    let content : any = {
      name: 'stack-name-default',
      defaultStage: 'production'
    };

    if (toolbox.parameters.options.name) {
      content.name = toolbox.parameters.options.name;
    }

    if (toolbox.parameters.options.stage) {
      content.defaultStage = toolbox.parameters.options.stage;
    }
    
    let filename = 'aws-stack-lock.json';

    try {
      await toolbox.filesystem.writeAsync(filename, JSON.stringify(content, null, 2));
      toolbox.print.success(`Created at: ${toolbox.filesystem.path(filename)}`);
    } catch (e) {
      toolbox.print.error(`Unable to write file at: ${toolbox.filesystem.path(filename)}`);
    }
  }
}

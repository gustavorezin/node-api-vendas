import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate) {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

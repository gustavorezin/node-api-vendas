interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contato@gustavorezin.com',
      name: 'Gustavo Rezin'
    }
  }
} as IMailConfig;

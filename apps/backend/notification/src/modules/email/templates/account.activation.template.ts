import { IObjectKeyValue } from '@corporate/utilities';

export function accountActivationTemplate(params: IObjectKeyValue): string {
  return JSON.stringify(params);
}

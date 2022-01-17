import { ConfigService } from '@nestjs/config';

export const TypeORMConfigFactory = async (config: ConfigService) => {
  const typeORMConfigs = config.get('database.mongodb');
  return typeORMConfigs ? typeORMConfigs : undefined;
};

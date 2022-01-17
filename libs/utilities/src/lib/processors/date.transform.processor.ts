import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export const DateTransformProcessor = (params: TransformFnParams) => {
  try {
    return new Date(params.value).toISOString();
  } catch (error) {
    throw new BadRequestException('Invalid Date');
  }
};

import { PartialType } from '@nestjs/mapped-types';
import { CreateSeccionDto } from './create-seccion.dto';

export class EditSeccionDto extends PartialType(CreateSeccionDto){}
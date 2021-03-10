import { PartialType } from '@nestjs/mapped-types';
import { CreateEscalaJerarquicaDto } from './create-escala-jerarquica.dto';

export class EditEscalaJerarquica extends PartialType(CreateEscalaJerarquicaDto){}
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, Length, UUIDVersion } from 'class-validator';
import { GenderEnum } from './enum';
import {v4 as uuid} from 'uuid';

export class UserDTO {
  /** Unique identification number */
  @ApiHideProperty()
  id: string = uuid();

  /** Name of the user */
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 16)
  name: string;

  /** Height of the user in cm */
  @ApiProperty()
  height: number;

  /** Weight of the user in kg */
  @ApiProperty()
  mass: number;

  /** Hair color */
  @ApiProperty()
  @IsOptional()
  hair_color?: string;

  /** Skin color */
  @ApiProperty()
  @IsOptional()
  skin_color?: string;

  /** Eye color */
  @ApiProperty()
  @IsOptional()
  eye_color?: string;

  /** Date of birth */
  @ApiProperty()
  date_of_birth: Date;

  /** Gender type - Male, Female, Other */
  @ApiProperty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}

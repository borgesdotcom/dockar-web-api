import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    MinLength,
    Min,
} from 'class-validator';

export class CreateCarDto {
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    model: string;

    @IsNotEmpty()
    @ApiProperty()
    brand: string;

    @Min(1.0)
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @ApiProperty()
    image: string;
}

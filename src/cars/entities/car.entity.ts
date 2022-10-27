import { Car, Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CarEntity implements Car {

    @ApiProperty()
    id: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    model: string;

    @ApiProperty()
    brand: string;

    @Transform(({ value }) => value.toNumber())
    @ApiProperty({ type: String })
    price: Prisma.Decimal;

    @ApiProperty()
    image: string;

    constructor(partial: Partial<CarEntity>) {
        Object.assign(this, partial);
    }
}
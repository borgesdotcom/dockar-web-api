import { PrismaClient } from '@prisma/client'
import { cars } from '../cars'

const prisma = new PrismaClient();

async function main() {
    for (let car of cars) {
        await prisma.car.create({
            data: car
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});

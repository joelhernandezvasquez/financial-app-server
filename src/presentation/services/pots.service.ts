import { prisma } from "../../data/postgres"
import { CustomError } from "../../domain/errors/custom.error";

export class PotService{

    constructor(){}

    getPots = async () => {
        try{
            const pots = await prisma.pots.findMany();
            return pots;
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        } 
    }
}
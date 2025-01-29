import { prisma } from "../../data/postgres"
import { CustomError } from "../../domain/errors/custom.error";

export class TransactionService{

    constructor(){}

    getTransanctions = async () => {
        try{
            const transactions = await prisma.transaction.findMany()
            return transactions;
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        } 
    }
}
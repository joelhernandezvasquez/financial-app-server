import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain/errors/custom.error";

export class BudgetService{

    constructor(){}

    getBudgets = async () => {
        try{
            const budgets = await prisma.budget.findMany();
            return budgets;
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        } 
    }
}
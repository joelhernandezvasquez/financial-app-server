import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain/errors/custom.error";
import { SpendingBudgetSummary } from "../types";

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
   //TODO: NEED TO OPTIMIZE THIS
    getSpendingSummary = async () => {
        try {
            const budgets = await prisma.budget.findMany();
    
            const summaryBudget = await Promise.all(
                budgets.map(async (budget) => {
                  const [latestSpending,totalAmount] = await Promise.all([
                    prisma.transaction.findMany({
                    where:{
                       category:budget.category 
                    },
                    take:3
                  }),
                     prisma.transaction.aggregate({
                        where: { category: budget.category },
                        _sum: { amount: true }
                    })])
    
                    return {
                        ...budget,
                         spent: Math.abs(totalAmount._sum.amount || 0),
                        latestSpending:latestSpending
                    };
                })
            );
    
            return summaryBudget;
        } catch (error) {
            throw CustomError.internalServerError('Internal Server Error');
        }
    };
}
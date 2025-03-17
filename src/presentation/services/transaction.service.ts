
import { prisma } from "../../data/postgres"
import { CustomError } from "../../domain/errors/custom.error";
import { Prisma } from "@prisma/client";

interface SummaryTransaction{
    id: number;
    avatar: string;
    name: string;
    category: string;
    date: Date;
    amount: number;
    recurring: boolean;
}

enum SortTransactionValues{
    Latest = 'Latest',
    Oldest = 'Oldest',
    Highest = 'Highest',
    Lowest = 'Lowest',
    AZ="AZ",
    ZA="ZA"
}
export class TransactionService{

    constructor(){}
    
    private getTransactionAmount = (amount:SummaryTransaction[]) =>{
       return amount.reduce((accumulator, currentValue) => accumulator + Math.abs(currentValue.amount), 0);
    }

    private getSortTransactionQuery = (sortBy:string) => {
        if (!sortBy) return undefined;

        const sortMapping: Record<string, Record<string, Prisma.SortOrder>> = {
            [SortTransactionValues.Latest]: { date: Prisma.SortOrder.desc },
            [SortTransactionValues.Oldest]: { date: Prisma.SortOrder.asc },
            [SortTransactionValues.Highest]: { amount: Prisma.SortOrder.desc },
            [SortTransactionValues.Lowest]: { amount: Prisma.SortOrder.asc },
            [SortTransactionValues.AZ]: { name: Prisma.SortOrder.asc },
            [SortTransactionValues.ZA]: { name: Prisma.SortOrder.desc }
        };
    
        const normalizedSortBy = sortBy === 'A to Z' ? SortTransactionValues.AZ : 
                                 sortBy === 'Z to A' ? SortTransactionValues.ZA : 
                                 sortBy;
    
        return sortMapping[normalizedSortBy] || undefined;
    }

    getTransanctions = async () => {
        try{
            const transactions = await prisma.transaction.findMany()
            return transactions;
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        } 
    }

    getTransactionSummary = async() =>{
        try{
            const fakeTodayDate = new Date('2024-07-30');
             let paidBills: SummaryTransaction[] = [];
             let dueSoonBills:SummaryTransaction[] = [];
             let upcomingBills:SummaryTransaction[] = [];

            const transactions = (await this.getTransanctions())
            .filter(transaction => transaction.category === 'Bills');

            for(let transaction of transactions) {
                if(transaction.date < fakeTodayDate){
                    paidBills = [...paidBills,transaction]   
                }
                const diffDays = Math.ceil((transaction.date.getTime() - fakeTodayDate.getTime()) / (1000 * 60 * 60 * 24));
                
                if(diffDays > 0 && diffDays <=7){
                    dueSoonBills = [...dueSoonBills,transaction]; 
                }

                if(diffDays > 7){
                    upcomingBills = [...upcomingBills,transaction];
                }
            }

            return[
                {
                    id:1001,
                    category:'Paid Bills',
                    amount:this.getTransactionAmount(paidBills),
                    theme:'#277C78'
                },
                {
                    id:2002,
                    category:'Total Upcoming',
                    amount:this.getTransactionAmount(upcomingBills),
                    theme:'#F2CDAC'
                },
                {
                    id:3003,
                    category:'Due Soon',
                    amount:this.getTransactionAmount(dueSoonBills),
                    theme:'#82C9D7'
                },
             ]
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        }
    }

    getTransactionCategories = async () =>{
      try{
        const categories = await prisma.transaction.findMany({
            distinct: ['category'],
            select: { category: true },
          });

          categories.unshift({category: "All Transactions"});
          return categories;
      }
      catch(error){
        throw CustomError.internalServerError('Internal Server Error');
      }
    }

    getFilterTransanctions = async (query:string,sortBy:string) => {
        try{
            const filterConditions:any[] = [
                { name: { contains:query , mode: "insensitive" } },
                { category: { contains: query, mode: "insensitive" } },
            ]
            
            const searchAmount = parseInt(query);
           
            if(!isNaN(searchAmount)){
               filterConditions.push({
                amount:searchAmount
               })
            }

            const orderByCondition = this.getSortTransactionQuery(sortBy);

            const transactions = await prisma.transaction.findMany({
                where: {
                    OR: query!=='All Transactions' ? filterConditions : undefined
                },
                orderBy:orderByCondition
              });
            return transactions;  
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        } 
    }


}
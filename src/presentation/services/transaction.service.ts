import { Response } from "express";
import { prisma } from "../../data/postgres"
import { CustomError } from "../../domain/errors/custom.error";

interface SummaryTransaction{
    id: number;
    avatar: string;
    name: string;
    category: string;
    date: Date;
    amount: number;
    recurring: boolean;
}
export class TransactionService{

    constructor(){}

    private getTransactionAmount = (amount:SummaryTransaction[]) =>{
       return amount.reduce((accumulator, currentValue) => accumulator + Math.abs(currentValue.amount), 0);
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

          return categories;
      }
      catch(error){
        throw CustomError.internalServerError('Internal Server Error');
      }
    }

    getFilterTransanctions = async (sender:string) => {
        try{
            const transactions = await prisma.transaction.findMany({
                where: {
                  name: {
                    contains: sender,
                    mode: "insensitive",
                  },
                },
              });
            return transactions;
            
        }
        catch(error){
            throw CustomError.internalServerError('Internal Server Error');
        } 
    }


}
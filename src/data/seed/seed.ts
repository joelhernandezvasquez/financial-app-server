import { prisma } from "../postgres";
import {budgets,pots, transactions} from './data';

async function main(){

    await prisma.budget.deleteMany();
    await prisma.pots.deleteMany();
    await prisma.transaction.deleteMany();
       
    await prisma.budget.createMany({
        data:budgets
    })

    await prisma.pots.createMany({
        data:pots
    })

    await prisma.transaction.createMany({
        data:transactions
    })


   console.log('seed executed')

}

(()=>{

    if(process.env.NODE_ENV === 'production') return; 
 main()
})()
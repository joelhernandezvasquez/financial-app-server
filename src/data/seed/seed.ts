import { prisma } from "../postgres";
import {budgets,pots} from './data';

async function main(){

    await prisma.budget.deleteMany();
    await prisma.pots.deleteMany();
       
    await prisma.budget.createMany({
        data:budgets
    })

    await prisma.pots.createMany({
        data:pots
    })


   console.log('seed executed')

}

(()=>{

    if(process.env.NODE_ENV === 'production') return; 
 main()
})()
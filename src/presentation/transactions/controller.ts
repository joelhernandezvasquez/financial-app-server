import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { CustomError } from "../../domain/errors/custom.error";

export class TransactionController {
    
    constructor(private readonly transactionService:TransactionService){}

    private handleError = (error:unknown,res:Response) =>{
       if(error instanceof CustomError){
         return res.status(error.statusCode).json({error:error.message})
       }
       console.log(`${error}`);
       return res.status(500).json({error:'Internal Server Error'});
    }

    getTransactions = async(req:Request,res:Response) => {
       this.transactionService.getTransanctions()
       .then(transactions => res.json(transactions))
       .catch(error => this.handleError(error,res))
      }

      getTransaction = async(req:Request,res:Response) => {
        return res.status(200).json('Get a Transaction');
     
         // this.categoryService.getCategories(paginationDTO!)
         // .then(categories => res.json(categories))
         // .catch(error => this.handleError(error,res))
       }

       getTransactionSummary = async(req:Request,res:Response) =>{

       this.transactionService.getTransactionSummary()
       .then(transactions => res.json(transactions))
       .catch(error => this.handleError(error,res))

       }
}
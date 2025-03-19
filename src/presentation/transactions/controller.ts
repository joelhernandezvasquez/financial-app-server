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

       getTransactionCategories = async(req:Request,res:Response) =>{
        this.transactionService.getTransactionCategories()
        .then(transactions => res.json(transactions))
        .catch(error => this.handleError(error,res))
       }

       getFilterTransactions= async(req:Request,res:Response) =>{
        const {query,page,sortBy} = req.query; 
        
         const transactionQueryParams = {
          query:query as string,
          page:+page! as number,
          sortBy:sortBy as string
         }

        this.transactionService.getFilterTransanctions(transactionQueryParams)
        .then(transactions => res.json(transactions))
        .catch(error => this.handleError(error,res))
       }

       fetchTransactionPages= async(req:Request,res:Response) =>{
        const {query} = req.query; 
  
        this.transactionService.fetchTransactionPages(query as string)
        .then(transactions => res.json(transactions))
        .catch(error => this.handleError(error,res))
       }
}
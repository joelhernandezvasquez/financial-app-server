import { Request, Response } from "express";
import { BudgetService } from "../services/budgets.service";
import { CustomError } from "../../domain/errors/custom.error";

export class BudgetController {
    
    constructor(private readonly budgetService:BudgetService){}

    private handleError = (error:unknown,res:Response) =>{
       if(error instanceof CustomError){
         return res.status(error.statusCode).json({error:error.message})
       }
       console.log(`${error}`);
       return res.status(500).json({error:'Internal Server Error'});
    }

    getBudgets = async(req:Request,res:Response) => {
        this.budgetService.getBudgets()
        .then(budgets => res.json(budgets))
        .catch(error => this.handleError(error,res))
      }

    createBudget = async(req:Request,res:Response) =>{
      return res.status(201).json('Create Budget');
    }

    updateBudget = async(req:Request,res:Response) =>{
      return res.status(200).json('Update Budget');
    }
    deleteBudget = async(req:Request,res:Response) =>{
      return res.status(200).json('Delete Budget');
    }


}
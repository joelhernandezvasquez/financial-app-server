import { Request, Response } from "express";


export class BudgetController {
    
    //constructor(private readonly categoryService:CategoryService){}

    // private handleError = (error:unknown,res:Response) =>{
    //    if(error instanceof CustomError){
    //      return res.status(error.statusCode).json({error:error.message})
    //    }
    //    console.log(`${error}`);
    //    return res.status(500).json({error:'Internal Server Error'});
    // }

    getBudgets = async(req:Request,res:Response) => {
       return res.status(200).json('Get Budgets');
    
        // this.categoryService.getCategories(paginationDTO!)
        // .then(categories => res.json(categories))
        // .catch(error => this.handleError(error,res))
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
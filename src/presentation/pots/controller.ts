import { Request, Response } from "express";
import { PotService } from "../services/pots.service";
import { CustomError } from "../../domain/errors/custom.error";

export class PotsController {
    
    constructor(private readonly potsService:PotService){}

    private handleError = (error:unknown,res:Response) =>{
       if(error instanceof CustomError){
         return res.status(error.statusCode).json({error:error.message})
       }
       console.log(`${error}`);
       return res.status(500).json({error:'Internal Server Error'});
    }

    getPots = async(req:Request,res:Response) => {
        this.potsService.getPots()
        .then(pots => res.json(pots))
        .catch(error => this.handleError(error,res))
      }

    createPot = async(req:Request,res:Response) =>{
      return res.status(201).json('Create a Pot');
    }

    updatePot = async(req:Request,res:Response) =>{
      return res.status(200).json('Update a Pot');
    }
    deletePot = async(req:Request,res:Response) =>{
      return res.status(200).json('Delete a Pot');
    }

    addMoney = async(req:Request,res:Response) =>{
      return res.status(200).json('Add Money')
    }

    withdrawMoney = async(req:Request,res:Response) =>{
        return res.status(200).json('Withdraw Money');
    }


}
import { Request,Response } from "express";
import { balance } from "../../data/seed/data";


export class BalanceController {

    constructor(){}

    getBalance = (req:Request,res:Response) =>{
     
      //TODO: test endpoint simulate data for now

      return res.status(200).json(balance);
    }
}
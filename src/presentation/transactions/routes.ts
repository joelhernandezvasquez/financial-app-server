import { Router } from 'express';
import { TransactionController} from './controller';
import { TransactionService } from '../services/transaction.service';
// import { AuthMiddleware } from '../middlewares/auth.middleware';


export class TransactionsRoutes {

  static get routes(): Router {

    const router = Router();
    const transactionService = new TransactionService();
    const controller = new TransactionController(transactionService);
  
     router.get('/',controller.getTransactions);
     router.get('/summary',controller.getTransactionSummary )
     router.get('/:id',controller.getTransaction);

    return router;
  }


}


import { Router } from 'express';
import { TransactionController} from './controller';
import { TransactionService } from '../services/transaction.service';
// import { AuthMiddleware } from '../middlewares/auth.middleware';


export class TransactionsRoutes {

  static get routes(): Router {

    const router = Router();
    const transactionService = new TransactionService();
    const controller = new TransactionController(transactionService);
     router.get('/sender',controller.getFilterTransactions)
     router.get('/pages',controller.fetchTransactionPages)
     router.get('/summary',controller.getTransactionSummary);
     router.get('/categories',controller.getTransactionCategories);
     router.get('/',controller.getTransactions);
     router.get('/:id',controller.getTransaction);

    return router;
  }


}


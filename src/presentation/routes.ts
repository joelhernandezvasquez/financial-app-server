import { Router } from 'express';
import { TransactionsRoutes } from './transactions/routes';
import { BudgetRoutes } from './budget/routes';
import { PotsController } from './pots/controller';
import { PotRoutes } from './pots/routes';
import { BalanceRoutes } from './balance/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/transactions',TransactionsRoutes.routes);
    router.use('/api/budget',BudgetRoutes.routes);
    router.use('/api/pots',PotRoutes.routes);
    router.use('/api/balance',BalanceRoutes.routes);
    
    return router;
  }


}


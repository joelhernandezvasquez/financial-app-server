export interface TransactionQueryParams{
    query:string,
    page:number,
    sortBy:string
}

export interface SpendingBudgetSummary {
    id:number,
    category:string,
    maximum:number,
    theme:string,
    spent:number,
    latestSpending:any []
}

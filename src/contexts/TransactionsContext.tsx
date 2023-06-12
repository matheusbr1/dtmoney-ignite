import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionsContext {
  transactions: Transaction[]
}

export const TransactionsContext = createContext({} as TransactionsContext)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/transactions')
      .then((response) => response.json())
      .then((response) => { setTransactions(response)})
  }, [])
  
  return (
    <TransactionsContext.Provider value={{ transactions }} >
      {children}
    </TransactionsContext.Provider>
  )
}
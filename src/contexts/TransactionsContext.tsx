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
  fetchTransacions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContext)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransacions (query?: string) {
    const url = new URL('http://localhost:3333/transactions')

    if (query) {
      url.searchParams.append('q', query)
    }

    const response = await fetch(url)
    const transactions =  await response.json()
    setTransactions(transactions)
  }

  useEffect(() => {
    fetchTransacions()
  }, [])
  
  return (
    <TransactionsContext.Provider value={{ 
      transactions, 
      fetchTransacions 
    }} >
      {children}
    </TransactionsContext.Provider>
  )
}
import { ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextOutput {
  transactions: Transaction[]
  fetchTransacions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext(
  {} as TransactionsContextOutput,
)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransacions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])

    console.log(response.data)
  }

  useEffect(() => {
    fetchTransacions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransacions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

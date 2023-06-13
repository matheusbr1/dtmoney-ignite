import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome'])s
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionsModal () {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateTransaction(data: newTransactionFormInputs) {
    console.log(data)
    await new Promise((resolve, reject) => {
      setTimeout(() => {resolve(true)}, 2000)
    })
  }

  return (
    <Dialog.Portal>
      <Overlay /> 
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <input 
            type="text" 
            placeholder='Descrição' 
            required 
            {...register('description')}
          />
          <input 
            type="number" 
            placeholder='Preço' 
            required 
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type="text" 
            placeholder='Categoria' 
            required 
            {...register('category')}
          />

          <TransactionType>
            <TransactionTypeButton variant='income' value='income' >
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            
            <TransactionTypeButton variant='outcome' value='outcome' >
              <ArrowCircleDown size={24} />
              Saídas
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit" disabled={isSubmitting} >Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
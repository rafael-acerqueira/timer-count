import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { CyclesContext } from '../../contexts/CycleContext'


interface NewCycleFormData {
  task: string,
  minutesAmount: number
}

export function Home() {

  const newCycleForm = useForm()
  const { handleSubmit, watch, reset } = newCycleForm

  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)

  const task = watch('task')
  const isSubmitFormDisable = !task


  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>

      <form onSubmit={handleSubmit(handleCreateNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitFormDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}

      </form>

    </HomeContainer>
  )
}
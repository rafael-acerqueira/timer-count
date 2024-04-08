import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, maskCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

export interface NewCycleFormData {
  task: string,
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  maskCurrentCycleAsFinished: () => void
  changeAmountSeconds: (seconds: number) => void
  createNewCycle: (data: NewCycleFormData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cycleState

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)


  function changeAmountSeconds(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function maskCurrentCycleAsFinished() {
    dispatch(maskCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      startDate: new Date(),
      ...data
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        maskCurrentCycleAsFinished,
        changeAmountSeconds,
        interruptCurrentCycle,
        createNewCycle,
        cycles
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
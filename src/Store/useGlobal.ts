import { useState, useEffect, SetStateAction, ReactInstance } from 'react'

let listeners: SetStateAction<any>[] = []
let state = {}

const setState = (newState: { [key: string]: any }) => {
  state = { ...state, ...newState }
  listeners.forEach(listener => {
    listener(state)
  })
}

const useCustom = () => {
  const newListener = useState()[1]
  useEffect(() => {
    listeners.push(newListener)
    return () => {
      listeners = listeners.filter(listener => listener !== newListener)
    }
  }, [])
  return [state, setState]
}

const useGlobal = (React: ReactInstance, initialState: { [key: string]: any }) => {
  const store = {}
}

export default useCustom

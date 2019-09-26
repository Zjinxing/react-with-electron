import React, { useContext, useEffect } from 'react'
import { remote } from 'electron'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/Container'
import ContextProvider, { AppContext, State } from './Store'

const { systemPreferences } = remote

const AppContainer: React.FC = () => {
  let isDarkMode: boolean = systemPreferences.isDarkMode()
  const { setData } = useContext(AppContext) as State
  useEffect(() => {
    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      function theThemeHasChanged() {
        console.log('isDarkMode', systemPreferences.isDarkMode())
        setData('isDarkMode', systemPreferences.isDarkMode())
        isDarkMode = systemPreferences.isDarkMode()
      }
    )
  }, [])
  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Header />
      <Container />
      <Footer />
    </div>
  )
}

const App: React.FC = props => {
  return (
    <ContextProvider>
      <AppContainer />
      <div>{props.children}</div>
    </ContextProvider>
  )
}

export default App

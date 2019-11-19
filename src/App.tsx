import React, { useContext, useEffect } from 'react'
import { remote } from 'electron'
import { GET_RECOMMEND } from 'request/Recommend'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/Container'
import ContextProvider, { AppContext, State } from './Store'
import { GET_NEW_ALBUMS } from 'request/Album'

const { systemPreferences } = remote

const sysDarkMode = () =>
  systemPreferences.getUserDefault('AppleInterfaceStyle', 'string') === 'Dark'

const AppContainer: React.FC = () => {
  const { setData, isDarkMode } = useContext(AppContext) as State
  useEffect(() => {
    ;(async () => {
      systemPreferences.subscribeNotification(
        'AppleInterfaceThemeChangedNotification',
        function theThemeHasChanged() {
          setData({ isDarkMode: sysDarkMode() })
        }
      )
      const [recommend, newAlbums] = await Promise.all([GET_RECOMMEND(), GET_NEW_ALBUMS(1)])
      const albumList = !newAlbums.code && newAlbums.new_album.data.albums
      setData({ recommend, albumList, albumArea: 1 })
    })()
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

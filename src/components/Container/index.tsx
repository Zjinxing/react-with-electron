import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sider from './Sider'
import Ranking from './Ranking'
import Choiceness from './Choiceness'
import SongList from './SongList'
import Radio from './Radio'
import MV from './MV'
import Favor from './Favor'
import Local from './Local'
import Download from './Download'
import History from './History'
import './index.scss'
import { AppContext, State } from 'Store'

const Container: React.FC = () => {
  const { recommend } = useContext(AppContext) as State
  const { response } = recommend
  response && console.log(response.focus)
  return (
    <div className="wrapper">
      <Router>
        <div className="sider">
          <Sider />
        </div>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Choiceness}></Route>
            <Route path="/ranking" component={Ranking}></Route>
            <Route path="/songList" component={SongList}></Route>
            <Route path="/radio" component={Radio}></Route>
            <Route path="/mv" component={MV}></Route>
            <Route path="/favor" component={Favor}></Route>
            <Route path="/local" component={Local}></Route>
            <Route path="/download" component={Download}></Route>
            <Route path="/history" component={History}></Route>
            <Route component={Choiceness}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Container

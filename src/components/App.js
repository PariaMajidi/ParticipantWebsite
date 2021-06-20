import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'

import Ready from './Ready'
import DefineParticipant from './DefineParticipant'
import Vibration from './Vibration'
import VibrationDirection from './VibrationDirection'
import VibrationReadyToContinue from './VibrationReadyToContinue'
import DirectionClarity from './DirectionClarity'
import NotificationDifference from './NotificationDifference'
import EndMenu from './EndMenu'
import Login from './Login'
import SelectFolder from './SelectFolder'
import SetRepetitions from './SetRepetitions'
import Menu from './Menu'
import SubMenu from './SubMenu'
import FileList from './FileList'
import DefineUnilateralBilateral from './DefineUnilateralBilateral'
import DefineGroup from './DefineGroup'
import ConfirmGroup from './ConfirmGroup'
import Game from './Game'

import { initialize } from '../utils/google'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initialize(() => history.push('/menu')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/menu'>
          <Menu />
        </Route>
        <Route path='/select-folder'>
          <SelectFolder />
        </Route>
        <Route path='/submenu'>
          <SubMenu />
        </Route>
        <Route path='/setRepetitions'>
          <SetRepetitions />
        </Route>
        <Route path='/defineParticipant'>
          <DefineParticipant />
        </Route>
        <Route path={DefineUnilateralBilateral.route}>
          <DefineUnilateralBilateral />
        </Route>
        <Route path={DefineGroup.route}>
          <DefineGroup />
        </Route>
        <Route path={ConfirmGroup.route}>
          <ConfirmGroup />
        </Route>

        <Route path='/ready'>
          <Ready />
        </Route>

        <Route path={Game.route} exact>
          <Game />
        </Route>
        <Route path={Vibration.route} exact>
          <Vibration />
        </Route>
        <Route path={VibrationDirection.route} exact>
          <VibrationDirection />
        </Route>
        <Route path={VibrationReadyToContinue.route} exact>
          <VibrationReadyToContinue />
        </Route>

        <Route path={NotificationDifference.route} exact>
          <NotificationDifference />
        </Route>
        <Route path={DirectionClarity.route} exact>
          <DirectionClarity />
        </Route>

        <Route path={EndMenu.route} exact>
          <EndMenu />
        </Route>

        <Route path='/file-list'>
          <FileList />
        </Route>

        <Redirect to='/login' />
      </Switch>
    </div>
  )
}

export default App

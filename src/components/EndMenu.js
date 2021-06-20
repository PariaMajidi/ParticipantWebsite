import React from 'react'

import Layout from './Layout'
import ButtonList from './ButtonList'
import Button from './Button'

import DefineUnilateralBilateral from './DefineUnilateralBilateral'
import DefineGroup from './DefineGroup'

import style from './EndMenu.module.scss'

const EndMenu = () => (
  <Layout
    title='Please raise your hand to the window and wait until the moderator come to
  the room. Thanks for your participation'
    className={style.section}
  >
    <ButtonList>
      <Button.Link to={DefineGroup.route}>New Group</Button.Link>
      <Button.Link to={DefineUnilateralBilateral.route}>
        New Condition
      </Button.Link>
      <Button.Link to='/defineParticipant'>New Participant</Button.Link>
      <Button.Link to='/menu'>Menu</Button.Link>
    </ButtonList>
  </Layout>
)

EndMenu.route = '/endMenu'

export default EndMenu

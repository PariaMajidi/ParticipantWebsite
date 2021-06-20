import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from './Layout'
import Button from './Button'
import ButtonList from './ButtonList'
import DefineGroup from './DefineGroup'

import { setUnilateral } from '../redux/sounds'

const DefineUnilateralBilateral = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <Layout>
      <ButtonList>
        <Button
          onClick={() => {
            dispatch(setUnilateral(true))
            history.push(DefineGroup.route)
          }}
        >
          Unilateral
        </Button>
        <Button
          onClick={() => {
            dispatch(setUnilateral(false))
            history.push(DefineGroup.route)
          }}
        >
          Bilateral
        </Button>
      </ButtonList>
    </Layout>
  )
}

DefineUnilateralBilateral.route = '/defineUnilateralBilateral'

export default DefineUnilateralBilateral

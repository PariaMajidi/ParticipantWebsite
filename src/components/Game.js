import React, { useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './Layout'
import Button from './Button'
import { getSound, setCurrentFeedback } from '../redux/sounds'
import getTime from '../utils/date'
import randomIntFromInterval from '../utils/random'
import VibrationDirection from './VibrationDirection'

import dinosaurUrl from '../assets/paria.png'
import backgroundUrl from '../assets/background.png'
import cactusUrl from '../assets/cactus.png'

import style from './Game.module.scss'

const HEIGHT = 1000
const SPEED = 30
const JUMP_FORCE = 70
const GRAVITY = 9.81
const CACTUS_Y = 500
const SHOW_HIT_BOX = false
const AVERAGE_TIMING = 20000
const NOTIFICATION_PITCH = 6000

const loadImage = (imageUrl, callback) => {
  const image = new Image()
  image.onload = callback
  image.src = imageUrl
}

const Game = () => {
  const { index } = useParams()
  const history = useHistory()

  const sound = useSelector(getSound(parseInt(index, 10) - 1))
  const dispatch = useDispatch()

  useEffect(() => {
    if (!sound?.name) return

    console.log('sound', sound)

    const audio = new Audio(sound?.url)

    audio.addEventListener('ended', event => {
      dispatch(
        setCurrentFeedback({
          vibration: sound?.name,
          endAudioTime: getTime(),
          index,
        })
      )
      history.push(VibrationDirection.route.replace(':index', index))
    })

    audio.addEventListener('error', event => {
      console.log('error')
    })

    const timing = randomIntFromInterval(
      AVERAGE_TIMING - NOTIFICATION_PITCH,
      AVERAGE_TIMING + NOTIFICATION_PITCH
    )

    console.log('timing', timing)

    const timeout = setTimeout(() => {
      audio
        .play()
        .then(() => {})
        .catch(error => {
          console.log('error', error)
        })
    }, timing)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound?.name])

  const ref = useRef()
  const jumpDateTime = useRef()

  const jumpHeight = () => {
    if (!jumpDateTime.current) {
      return 0
    }

    const time = (new Date() - jumpDateTime.current) / 60

    const height = JUMP_FORCE * time - 0.5 * GRAVITY * time * time

    return height >= 0 ? height : 0
  }

  const jump = () => {
    if (jumpHeight() <= 0) {
      jumpDateTime.current = new Date()
    }
  }

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')

    canvas.height = HEIGHT
    const ratio = HEIGHT / canvas.offsetHeight
    canvas.width = canvas.offsetWidth * ratio
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const dinosaurBaseY = canvas.height / 2
    const dinosaurBaseX = 500

    let position = { x: canvas.width / 3, y: 0 }

    let dinosaur
    let background
    let cactus

    loadImage(backgroundUrl, function () {
      background = this
    })

    loadImage(dinosaurUrl, function () {
      dinosaur = this
    })

    loadImage(cactusUrl, function () {
      cactus = this
    })

    let cactusPositions = []

    const gameStartDateTime = new Date()

    let interval = null

    const run = () => {
      if (!background || !dinosaur || !cactus) {
        return
      }

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const backgroundWidth = background.width * 3

      for (let i = 0; i <= canvas.height / backgroundWidth + 2; i++) {
        ctx.drawImage(
          background,
          0,
          0,
          background.width,
          background.height,
          backgroundWidth * i - (position.x % backgroundWidth),
          600,
          backgroundWidth,
          background.height * 3
        )
      }

      if (
        cactusPositions.length === 0 ||
        cactusPositions[cactusPositions.length - 1] - position.x <
          dinosaurBaseX + canvas.width / 2
      ) {
        cactusPositions.push(
          position.x + canvas.width + randomIntFromInterval(0, canvas.width / 4)
        )
      }

      cactusPositions = cactusPositions.filter(p => p - position.x > -400)

      cactusPositions.forEach(cactusPosition => {
        ctx.drawImage(
          cactus,
          0,
          0,
          cactus.width,
          cactus.height,
          cactusPosition - position.x,
          CACTUS_Y,
          cactus.width / 2,
          cactus.height / 2
        )

        if (SHOW_HIT_BOX) {
          ctx.beginPath()
          ctx.lineWidth = '6'
          ctx.strokeStyle = 'red'
          ctx.rect(
            cactusPosition - position.x,
            CACTUS_Y,
            cactus.width / 2,
            cactus.height / 2
          )
          ctx.stroke()
        }
      })

      const dinosaurY = dinosaurBaseY - jumpHeight()

      ctx.drawImage(
        dinosaur,
        0,
        0,
        dinosaur.width,
        dinosaur.height,
        dinosaurBaseX,
        dinosaurY,
        dinosaur.width / 2,
        dinosaur.height / 2
      )

      if (SHOW_HIT_BOX) {
        ctx.beginPath()
        ctx.lineWidth = '6'
        ctx.strokeStyle = 'red'
        ctx.rect(
          dinosaurBaseX,
          dinosaurY,
          dinosaur.width / 2,
          dinosaur.height / 2
        )
        ctx.stroke()
      }

      if (new Date() - gameStartDateTime < 3000) {
        ctx.font = 'bold 140px Arial'
        ctx.fillStyle = 'blue'
        ctx.textAlign = 'center'
        ctx.fillText('Avoid the cactus', canvas.width / 2, canvas.height / 2)
      }

      position.x += SPEED

      const hitPoints = [
        {
          x: dinosaurBaseX + dinosaur.width / 2,
          y: dinosaurY,
        },
        {
          x: dinosaurBaseX + dinosaur.width / 2,
          y: dinosaurY + dinosaur.height / 8,
        },
        {
          x: dinosaurBaseX + dinosaur.width / 4,
          y: dinosaurY + dinosaur.height / 2,
        },
        {
          x: dinosaurBaseX,
          y: dinosaurY + dinosaur.height / 4,
        },
      ]

      if (SHOW_HIT_BOX) {
        hitPoints.forEach(hitPoint => {
          ctx.beginPath()
          ctx.lineWidth = '6'
          ctx.strokeStyle = 'blue'
          ctx.rect(hitPoint.x, hitPoint.y, 6, 6)
          ctx.stroke()
        })
      }

      const hitted = hitPoints.some(p =>
        cactusPositions.some(
          cactusPosition =>
            p.x > cactusPosition - position.x &&
            p.x < cactusPosition - position.x + cactus.width / 2 &&
            p.y > CACTUS_Y &&
            p.y < CACTUS_Y + cactus.height / 2
        )
      )

      if (hitted) {
        ctx.font = 'bold 140px Arial'
        ctx.fillStyle = 'red'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2)
        clearInterval(interval)
        cactusPositions = []
        position = { x: canvas.width / 3, y: 0 }

        setTimeout(() => {
          interval = setInterval(run, 20)
        }, 3000)
      }
    }

    interval = setInterval(run, 20)

    const listener = event => {
      if (event.code === 'Space') {
        jump()
      }
    }
    document.addEventListener('keydown', listener)

    return () => {
      clearInterval(interval)
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Layout onClick={jump}>
      <canvas className={style.canvas} ref={ref}></canvas>
      <div className={style.buttons}>
        <Button className={style.button} onClick={jump}>
          Jump
        </Button>{' '}
        <Button className={style.button} onClick={jump}>
          Jump
        </Button>
      </div>
    </Layout>
  )
}

Game.route = '/game/:index'

export default Game

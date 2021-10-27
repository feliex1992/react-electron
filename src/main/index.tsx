import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import '@/presentation/styles/global.scss'

import Router from './routes/router'

ReactDOM.render(
  <Router />,
  document.getElementById('main')
)

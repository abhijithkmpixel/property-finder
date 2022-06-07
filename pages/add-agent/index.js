import React from 'react'
import AddAgent from '../../components/AddAgent'
import HeadTag from '../../components/Head'
import Header from '../../components/Header'

const index = () => {
  return (
    <div><HeadTag title='Agents' meta='add a new agent to the db'/><Header/><AddAgent/> </div>
  )
}

export default index
import React from 'react'
import AddAgent from '../../components/AddAgent'
import HeadTag from '../../components/Head'
import Header from '../../components/Header'

const index = () => {
  return (
    <div><HeadTag title='Agents'/><Header/><AddAgent/> </div>
  )
}

export default index
import Head from 'next/head'
import Image from 'next/image'
import HeadTag from '../components/Head'
import Header from '../components/Header'
import HomeBanner from '../components/HomeBanner'
import PageLoader from '../components/PageLoader'
import RecommendedProp from '../components/RecommendedProp'
import styles from '../styles/Home.module.css'

export default function Home({propList,agents}) {
  return (
    <>
    <Header />
    <HeadTag title={'Property finder'} />
    <HomeBanner />
    <RecommendedProp title='Recommended properties' list={propList} agents={agents}/>
    </>
  )
}

export async function getServerSideProps(context){
const data = await fetch(`http://` + context.req.headers.host +'/api/all')
.then(res =>res.json())
.then(json=> {return json})  

const agents = await fetch(`http://` + context.req.headers.host +'/api/agents')
.then(res =>res.json())
.then(json=> {return json})
return{
  props:{
    propList:data,
    agents:agents
  }
}

}
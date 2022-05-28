import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import HomeBanner from '../components/HomeBanner'
import RecommendedProp from '../components/RecommendedProp'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Header />
    <HomeBanner />
    <RecommendedProp title='Recommended properties' list='' />
    </>
  )
}

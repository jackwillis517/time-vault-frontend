import Head from 'next/head'
import Header from '../components/Header'
import Body from '../components/Body'
import Topper from '../components/Topper'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Time Vault</title>
        <meta name="description" content="Time Vault" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Header/>
      <Topper/>
      <Body/>
      <Footer/>
    </div>
  )
}

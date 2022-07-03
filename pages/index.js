import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Time Vault</title>
        <meta name="description" content="Time Vault" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Header />
    </div>
  )
}

import styles from '../styles/Home.module.css'
import {Toolbar} from "../components/toolbar";
import {useState} from "react";
import Head from "next/head";

type New = {
    image_big: string,
    date: string,
    lead: string,
}

export const Home = ({news}: any) => {

    const [languageId, setLanguageId] = useState(1);

  return (
      <div className='page-container'>
          <Head>
              <title>ITMO news</title>
              <meta name="description" content="Web app to read news of ITMO"/>
              <link rel="icon" href="/favicon.ico"/>
          </Head>
          <Toolbar setLanguageId={setLanguageId}/>

          <div className={styles.main}>
              <h1>Новости и события</h1>
              <div>
                  {
                      news ? (news.map((article: New, key: number) =>
                          <h2 key={key}>{article.date}</h2>
                      )) : <></>
                  }
              </div>
          </div>
      </div>
  )
}

export const getServerSideProps = async () => {

    const apiResponse = await fetch(
        `https://news.itmo.ru/api/news/list/?ver=2.0&lead=2&per_page=2&language_id=1`
    ).then(res => res.json())

    const { news } = apiResponse

    return {
        props: {
            news,
        },
    }
}

export default Home

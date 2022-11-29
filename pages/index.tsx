import styles from "../styles/Home.module.css"
import { Toolbar } from "../components/toolbar"
import { useEffect, useState } from "react"
import Head from "next/head"

type New = {
    title: string
    image_big: string
    date: string
    lead: string
    url: string
}

export const Home = () => {
    const [languageId, setLanguageId] = useState<number>(1)
    const [news, setNews] = useState<New[]>()

    const getServerSideProps = async () =>
        await fetch(
            `https://news.itmo.ru/api/news/list/?ver=2.0&lead=2&per_page=9&language_id=${languageId}`
        )
            .then((res: Response) => res.json())
            .catch((reason: any) => {
                console.log(reason)
            })

    useEffect(() => {
        getServerSideProps().then((data) => {
            const { news } = data
            setNews(news)
        })
    }, [languageId])

    return (
        <div className="page-container">
            <Head>
                <title>ITMO news</title>
                <meta
                    name="description"
                    content="Web app to read news of ITMO"
                />
                <link rel="icon" href="/itmo_icon.png" />
            </Head>
            <Toolbar setLanguageId={setLanguageId} />

            <div className={styles.main}>
                <div className={styles.title}>
                    <h1>Новости и события</h1>
                </div>
                <div className={styles.news}>
                    {news ? (
                        news.map((article: New, index: number) => (
                            <div
                                onClick={() =>
                                    (window.location.href = article.url)
                                }
                                className={styles.article}
                                key={index}
                            >
                                <img
                                    src={article.image_big}
                                    alt={article.title}
                                />
                                <h5>{article.date}</h5>
                                <p>{article.title}</p>
                                {/*<div dangerouslySetInnerHTML={{ __html: article.lead }}></div>*/}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home

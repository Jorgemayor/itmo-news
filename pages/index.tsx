import styles from "../styles/Home.module.css"
import { Toolbar } from "../components/toolbar"
import { useEffect, useState } from "react"

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
            <Toolbar setLanguageId={setLanguageId} />

            <div className={styles.main}>
                <div className={styles.title}>
                    <h1>Новости и события</h1>
                </div>
                <div className={styles.news}>
                    {news ? (
                        news.map((article: New, index: number) => {
                            let parsedDate: Date = new Date(article.date)
                            const longEnUSFormatter = new Intl.DateTimeFormat(
                                "ru-RU",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )
                            let date: string =
                                longEnUSFormatter.format(parsedDate)
                            return (
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
                                    <h5>{date}</h5>
                                    <p>{article.title}</p>
                                    {/*<div dangerouslySetInnerHTML={{ __html: article.lead }}></div>*/}
                                </div>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home

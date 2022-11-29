import { Toolbar } from "../components/toolbar"
import styles from "../styles/Article.module.css"
import { NextRouter, useRouter, withRouter } from "next/router"

interface Props {
    router: NextRouter
}

export const Article = (props: Props) => {
    const { title, image_big: image, date, lead, url } = props.router.query
    const router = useRouter()

    const handleClick = () => {
        router.push("/").then((r) => console.log(r))
    }

    return (
        <div className="page-container">
            <Toolbar />
            <div className={styles.main}>
                {typeof title === "string" &&
                typeof image === "string" &&
                typeof date === "string" &&
                typeof lead === "string" &&
                typeof url === "string" ? (
                    <>
                        <div className={styles.title}>
                            <h1>{title}</h1>
                            <h5>{date}</h5>
                        </div>
                        <div className={styles.content}>
                            <img src={image} alt={title} />
                            <div
                                dangerouslySetInnerHTML={{ __html: lead }}
                            ></div>
                            <p>Источник: {url}</p>
                        </div>
                    </>
                ) : (
                    <div className={styles.undefined}>
                        <h1>Новость не найдена.</h1>
                    </div>
                )}
                <button className={styles.homeButton} onClick={handleClick}>
                    Home
                </button>
            </div>
        </div>
    )
}

export default withRouter(Article)

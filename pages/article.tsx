import { Toolbar } from "../../components/toolbar"
import styles from "../../styles/Article.module.css"
import Image from "next/image";
import {NextPage} from "next";
import {NextRouter, withRouter} from "next/router";

interface Props {
    router: NextRouter
}

export const Article = (props: Props) => {
    const {title, image_big: image, date, lead, } = props.router.query
    console.log(title)
    return (
        <div className="page-container">
            <Toolbar />
            <div className={styles.main}>
                <div className={styles.title}>
                    <h1>{title}</h1>
                    <h5>{date}</h5>
                </div>
                <div className={styles.content}>
                    <img src={image} alt={title}/>
                    <div dangerouslySetInnerHTML={{ __html: lead }}></div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Article)

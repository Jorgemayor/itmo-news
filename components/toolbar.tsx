import styles from '../styles/Toolbar.module.css'
import Image from 'next/image'
import { FunctionComponent } from "react";

type Props = {
    setLanguageId: any,
}

export const Toolbar: FunctionComponent<Props> = ({setLanguageId}) => {

    const manageClick = () => {
        setLanguageId(2)
    }

    return (
        <div className={styles.main}>
            <Image src={"/logo.svg"} alt={"ITMO Logo"} width={161.33} height={16}/>
            <button onClick={manageClick}></button>
        </div>
    )
}

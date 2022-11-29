import styles from "../styles/Toolbar.module.css"
import Image from "next/image"
import { Dispatch, FC, SetStateAction } from "react"

interface Props {
    setLanguageId?: Dispatch<SetStateAction<number>>
}

export const Toolbar: FC<Props> = ({ setLanguageId }) => {
    const handleClick = () => {
        if (setLanguageId) {
            setLanguageId(2)
        }
    }

    return (
        <div className={styles.main}>
            <Image
                src={"/itmo_logo.svg"}
                alt={"ITMO Logo"}
                width={161.33}
                height={16}
            />
            {setLanguageId ? (
                <button onClick={handleClick}>English</button>
            ) : (
                <></>
            )}
        </div>
    )
}

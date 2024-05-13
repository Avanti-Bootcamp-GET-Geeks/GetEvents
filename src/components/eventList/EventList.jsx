import styles from './eventList.module.css'

export const EventList = ({children}) => {
    return(
        <div className={styles.cardList}>
                {children}
        </div>
    )
}
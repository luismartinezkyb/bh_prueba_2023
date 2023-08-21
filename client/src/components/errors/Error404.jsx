import styles from "../../style.js";


export default function Error404() {
    return (
        <div className={`h-screen absolute flex items-center bg-tertiary justify-center w-screen  `}>
            <div className='p-8 rounded-2xl bg-white w-[70%] sm:w-[60%]'>
                    <p className={`${styles.sectionSubText}`}>Error | 404 </p>
                    <h3 className={styles.sectionHeadText}>El recurso al que intentas acceder no existe</h3>
            </div>
        </div>
    )
}

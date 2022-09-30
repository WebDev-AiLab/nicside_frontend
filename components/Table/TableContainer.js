import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import formatPrice from '../../utils/formatPrice'

import styles from './Table.module.css'
import TableCategory from './TableCategory'
import TableRow from './TableRow'

const TableContainer = ({data, showCategory = true}) => {

    const [hidden, setHidden] = useState([])
    const [priceIndex, setPriceIndex] = useState(0)
    const [cart, setCart] = useContext(CartContext)

    let default_summ = cart.reduce((prev, now) => {

        let s = now.salePrices?.[0]?.value * now.amount

        return prev + s
    }, 0)


    useEffect(() => {
        if (default_summ < 200) {
            setPriceIndex(0)
        } else if (default_summ < 500) {
            setPriceIndex(1)
        } else if (default_summ >= 500) {
            setPriceIndex(2)
        }
    }, [cart])





  return (
    <div className={styles.table}>
        <div className={styles.table_header}>
            <div className={styles.image}>
                
                <img></img> 
            </div>
            {/* <div className={styles.code}>
                Код
            </div> */}
            <div className={styles.title}>
                Наименование
            </div>
            {/* <div className={styles.sku}>
                Описание
            </div>   */}
            <div className={styles.amount}>
                Количество
            </div>
            
            <div className={styles.table__prices}>
                <p>Цены</p>
                <div className={styles.price}>
                    от 100 руб.
                </div>
                <div className={styles.price}>
                    от 200 руб.
                </div>
                <div className={styles.price}>
                    от 500 руб.
                </div>
            </div>
            <div className={styles.summ}>
                Сумма
            </div>
        </div>
        {
            data?.map((item, index) => {

                // console.log(item, item?.pathName,data?.[index - 1]?.pathName)

                if (item?.product?.pathName != data?.[index - 1]?.product?.pathName && showCategory) {
                    return (
                        < >
                        <TableCategory key={item?.id + 'cat'} setHidden={setHidden} item={item}/>
                        <TableRow key={item?.id + 'row'} hidden={hidden} item={item} priceIndex={priceIndex}/>
                        </>
                    )
                } else {
                    return (
                        <TableRow key={item?.id} hidden={hidden} item={item} priceIndex={priceIndex}/>
                    )
                }

            })
        }
    </div>
  )
}

export default TableContainer
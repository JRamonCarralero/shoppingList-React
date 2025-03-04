import styles from "../app/page.module.css"

/**
 * Renderiza una lista de items con su cantidad, precio, y los botones de editar y borrar.
 * 
 * @param {Array} items - Lista de los items a mostrar. Cada item debe tener las siguiente propiedades: 
 *                        _id, article, qty y price.
 * @param {Function} onDeleteItem - Funcion callback para el borrado de un item que recibe el id del item a borrar.
 * @param {Function} onEditItem - Funcion callback para la edicion de un item que recibe el item a editar.
 * @returns {JSX.Element} Un elemento JSX que representa la tabla de items.
 */
export default function ItemsTable({ items, onDeleteItem, onEditItem })  {
    const calcularTotal = () => {
        let total = 0
        items.forEach(item => {
            total += item.qty * item.price
        })
        return total
    }
    return (
        <div className={styles.listContainer}>
            <table className={styles.listTable}>
                <thead>
                    <tr className={styles.bb2}>
                        <th>Artículo</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {items.map((item) => (
                        <tr className={`${styles.tr} ${styles.bb1}`} key={item._id}>
                            <td className={styles.td}>{item.article}</td>
                            <td className={styles.td}>{item.qty}</td>
                            <td className={styles.td}>{item.price} €</td>
                            <td className={styles.td}>{item.qty * item.price} €</td>
                            <td className={styles.td}>
                                <button className={styles.btn} onClick={() => onEditItem(item)}>✎</button>
                                <button className={styles.btn} onClick={() => onDeleteItem(item._id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3">TOTAL:</th>
                        <th><span id="list-total">{calcularTotal()}</span> €</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
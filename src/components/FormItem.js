import styles from "../app/page.module.css"

/**
 * Formulario para agregar un item a la lista de la compra.
 * @param {{ _id: string, article: string, qty: number, price: number, onSetId: (string) => void, onSetArticle: (string) => void, onSetQty: (number) => void, onSetPrice: (number) => void, onCreateItem: (item) => void, onUpdateItem: (item) => void, onResetList: () => void }} props - Las propiedades del formulario.
 * @returns {JSX.Element} Un JSX element que representa el formulario.
 */
export default function FormItem({ _id, article, qty, price, onSetId, onSetArticle, onSetQty, onSetPrice, onCreateItem, onUpdateItem, onResetList }) {

    /**
     * Agrega un item a la lista de la compra. Si el item ya existe (tiene un id), lo actualiza.
     * Si no existe, lo crea.
     * Limpia los campos del formulario cuando termina.
     */
    function addItem() {
        if (!article || !qty || !price) {
            alert('Todos los campos son obligatorios')
            return;
        }
        if (_id) {
            onUpdateItem({ _id, article, qty, price })
        } else {
            onCreateItem({article, qty, price })
        }
        onSetId('')
        onSetArticle('')
        onSetQty(0)
        onSetPrice(0)
    }

    return (
        <div className={styles.formContainer}>
            <fieldset>
                <legend>Añadir a la lista</legend>
                <form className={styles.formArticle}>
                    <div className={styles.addListForm}>     
                        <input type="hidden" name="id-item" id="id-item" value={_id} onChange={(e) => setId(e.target.value)}/>              
                        <input className={styles.inp} type="text" name="item" id="item" placeholder="artículo" value={article} onChange={(e) => onSetArticle(e.target.value)} autoComplete="off" />
                        <input className={styles.inp} type="number" name="qty" id="qty" value={qty} onChange={(e) => onSetQty(e.target.value)} placeholder="cantidad" />
                        <input className={styles.inp} type="number" name="price" id="price" value={price} onChange={(e) => onSetPrice(e.target.value)} placeholder="precio" />
                        <button type="button" id="add-btn" className={styles.btn} onClick={(e) => addItem()}>Añadir</button>
                    </div>
                    <div className={styles.clearListCont}>
                        <button type="reset" id="reset-btn" className={styles.btn} onClick={(e) => onResetList()}>Nueva lista de la compra</button>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}
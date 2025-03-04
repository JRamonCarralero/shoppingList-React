'use client'
import styles from "./page.module.css";
import { useState, useReducer } from "react";
import shoppingListReducer from "@/store/ShopinnglistReducer";
import FormItem from "@/components/FormItem";
import ItemsTable from "@/components/itemsTable";
import Login from "../components/Login";

  /**
   * @function Home
   * @description Componente principal de la aplicacion, que renderiza la
   *              lista de la compra y un formulario para agregar nuevos
   *              items.
   * @prop {Object} store - El estado de la aplicacion, que contiene la lista
   *                        de items y el usuario autenticado.
   * @prop {function} dispatch - La funcion que se encarga de actualizar el
   *                             estado de la aplicacion.
   * @prop {string} _id - El id del item que se va a editar.
   * @prop {string} article - El nombre del item que se va a editar.
   * @prop {number} qty - La cantidad del item que se va a editar.
   * @prop {number} price - El precio del item que se va a editar.
   * @prop {function} createItem - La funcion que se encarga de agregar un
   *                               nuevo item a la lista.
   * @prop {function} updateItem - La funcion que se encarga de actualizar un
   *                               item existente en la lista.
   * @prop {function} resetList - La funcion que se encarga de eliminar todos
   *                              los items de la lista.
   * @prop {function} deleteItem - La funcion que se encarga de eliminar un
   *                               item de la lista.
   * @prop {function} editItem - La funcion que se encarga de editar un item
   *                             de la lista.
   * @prop {function} showLogin - La funcion que se encarga de mostrar el
   *                              formulario de login.
   * @prop {function} login - La funcion que se encarga de autenticar al
   *                           usuario.
   * @prop {function} logout - La funcion que se encarga de cerrar la
   *                            sesion del usuario.
   * @prop {function} Greetings - La funcion que se encarga de saludar al
   *                               usuario autenticado.
   * @prop {function} LoginOrLogout - La funcion que se encarga de mostrar el
   *                                  enlace para autenticarse o cerrar la
   *                                  sesion.
   * @prop {function} chargeDefaultItems - La funcion que se encarga de
   *                                        cargar la lista de items por
   *                                        defecto.
   * @returns {JSX.Element} El componente principal de la aplicacion.
   */
export default function Home() {
  const initialState = {
          items: [],
          currentUser: null
      };
  const [store, dispatch] = useReducer(shoppingListReducer, initialState);

  const [_id, setId] = useState('')
  const [article, setArticle] = useState('')
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  /**
   * @function createItem
   * @description Agrega un nuevo item a la lista.
   * @param {object} item - El item a agregar, que debe tener las propiedades
   *                        article, qty y price.
   */
  function createItem(item) {
    const newId = String(new Date().getTime());
    const itemFull = { ...item, _id: newId }
    dispatch({ type: "CREATE_ITEM", payload: itemFull });
  }

  /**
   * @function updateItem
   * @description Actualiza un item existente en la lista.
   * @param {object} item - El item a actualizar, que debe tener las
   *                        propiedades article, qty y price.
   */
  function updateItem(item) {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  }

/**
 * @function resetList
 * @description Elimina todos los items de la lista de compras.
 */
  function resetList() {
    dispatch({ type: "DELETE_ALL_ITEMS" });
  }

  /**
   * @function deleteItem
   * @description Elimina el item con el id especificado de la lista.
   * @param {string} id - El id del item a eliminar.
   */
  function deleteItem(id) {
    dispatch({ type: "DELETE_ITEM", payload: id });
  }

  /**
   * @function editItem
   * @description Edita el item especificado en el formulario.
   * @param {object} item - El item a editar, que debe tener las propiedades
   *                        _id, article, qty y price.
   */
  function editItem(item) {
    setId(item._id);
    setArticle(item.article);
    setQty(item.qty);
    setPrice(item.price);
  }

  /**
   * Muestra el formulario de login.
   */
  function showLogin() {
    const loginBox = document.getElementById("loginBox");
    loginBox.style.display = "flex";
  }

  /**
   * @function login
   * @description Inicia sesion con el email y password dados.
   *              Si el email y password son correctos, se crea un usuario
   *              con el token y se dispatcha el evento de login.
   *              Si no, no se hace nada.
   * @param {string} email - El email del usuario.
   * @param {string} password - El password del usuario.
   */
  function login(email, password) {
    if (email==='prueba@email.com' && password === '1234') {
      const user = {
        email: 'prueba@email.com',
        name: 'Pedro',
        token: '1a2b3c4d'
      }
      dispatch({ type: "LOGIN", payload: user });
      const loginBox = document.getElementById("loginBox");
      loginBox.style.display = "none";
    }
  }

  /**
   * Cierra la sesion actual y limpia el token del usuario.
   */
  function logout() {
    dispatch({ type: "LOGOUT" });
  }

/**
 * @function Greetings
 * @description Saluda al usuario autenticado mostrando un mensaje de bienvenida 
 *              si hay un usuario actual en la tienda.
 * @returns {JSX.Element | undefined} Un elemento JSX con el saludo para el 
 *                                    usuario autenticado, o indefinido si no 
 *                                    hay usuario presente.
 */
  function Greetings() {
    if (store.currentUser) {
      return <h2>Bienvenido {store.currentUser.name}</h2>
    }
  }

/**
 * @function LoginOrLogout
 * @description Muestra un enlace para iniciar o cerrar sesión, dependiendo de si 
 *              hay un usuario autenticado actualmente en la tienda.
 * @returns {JSX.Element} Un elemento JSX que representa el enlace de "Login" si 
 *                        no hay usuario autenticado, o "Logout" si hay un usuario 
 *                        autenticado.
 */
  function LoginOrLogout() {
    if (store.currentUser) {
      return <li className={styles.li} onClick={() => {logout()}}>Logout</li>
    } else {
      return <li className={styles.li} onClick={() => {showLogin()}}>Login</li>
    }
  }

  /**
   * @function chargeDefaultItems
   * @description Carga los items predeterminados en la tienda.
   *              Los items predeterminados son:
   *              - Leche (1 unidad, 1.50 eur)
   *              - Pan (2 unidades, 0.75 eur)
   *              - Cerveza (3 unidades, 1.25 eur)
   *              - Tomate (4 unidades, 0.50 eur)
   *              - Cebolla (5 unidades, 0.75 eur)
   */
  function chargeDefaultItems() {
    const defItems = [
      { _id: '1', article: 'Leche', qty: 1, price: 1.50 },
      { _id: '2', article: 'Pan', qty: 2, price: 0.75 },
      { _id: '3', article: 'Cerveza', qty: 3, price: 1.25 },
      { _id: '4', article: 'Tomate', qty: 4, price: 0.50 },
      { _id: '5', article: 'Cebolla', qty: 5, price: 0.75 },
    ]
    dispatch({ type: "LOAD_ITEMS", payload: defItems });
  }

  return (
    <div className={styles.page}>
      <header className={styles.mainHdr}>
        <h1>Lista de la compra</h1>
        <Greetings />
      </header>
      <div className={styles.login} id="loginBox">
        <Login onLogin={login} />
      </div>
      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>
            <FormItem _id={_id} article={article} qty={qty} price={price} onSetId={setId} onSetArticle={setArticle} onSetQty={setQty} onSetPrice={setPrice} onCreateItem={createItem} onUpdateItem={updateItem} onResetList={resetList}/>
            <ItemsTable items={store.items} onDeleteItem={deleteItem} onEditItem={editItem} />
        </div>
        <div className={styles.rightMenu}>
            <nav>
                <ul className={styles.menu}>
                    <LoginOrLogout />
                    <li className={styles.li} onClick={() => {chargeDefaultItems()}}>Lista ejemplo</li>
                </ul>
            </nav>
        </div>
    </main>
    </div>
  );
}
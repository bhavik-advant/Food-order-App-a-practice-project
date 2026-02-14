import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => { return totalPrice + (item.quantity * item.price) }, 0)

    // console.log(cartTotal);
    
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => <li key={item.id}>{item.name} - {item.quantity}</li>)}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button>Go to Checkout</Button>
            </p>
        </Modal>
    )
}
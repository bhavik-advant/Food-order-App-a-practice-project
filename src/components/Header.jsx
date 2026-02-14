import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext';
import Button from '../UI/Button'
import UserProgressContext from '../store/UserProgressContext';


export default function Header(){
    const cartCtx = useContext(CartContext);
    const  userProgressCtx = useContext(UserProgressContext)

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    const totalCartItems = cartCtx.items.reduce((totalItems , item)=>{
        return totalItems += item.quantity;
    },0)

    return (
        <header id='main-header'>
            <div id='title'>
                <img id='' src={logoImg} alt="food logo" />
                <h1>Food Order APP</h1>
            </div>
            <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
        </header>
    )
}
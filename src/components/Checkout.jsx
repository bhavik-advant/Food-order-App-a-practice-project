import { useContext , useActionState} from "react";
import CartContext from "../store/CartContext";
import Modal from "./Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from './Error'
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}
// body: JSON.stringify({
//     order: {
//         items: cartCtx.items,
//         customer: customerData
//     }
// })

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => { return totalPrice + (item.quantity * item.price) }, 0)

    const userProgressCtx = useContext(UserProgressContext)

    const { data, error, sendRequest ,clearData} = useHttp("http://localhost:3000/orders", requestConfig)

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    function checkoutAction(prevState , fd) {
        // event.preventDefault();

        // const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));

        // fetch('http://localhost:3000/orders',{
        //     method : 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     },
        //     body : JSON.stringify({
        //         order:{
        //             items : cartCtx.items,
        //             customer : customerData
        //         }
        //     })
        // })
    }

    const [formState , formAction , isSending] = useActionState(checkoutAction , null)

    let actions = (
        <>
             <Button onClick={handleClose} type="button" textOnly>Close</Button>
             <Button >Submit Order</Button>
        </>
       
    );
    if(isSending){
        actions = <span>Sending order data...</span>
    }

    if(data && !error){
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                {/* {console.log(data)} */}
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            {/* {console.log("form modal...")} */}
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error}/>}

                <p className="modal-actions">
                   {actions}
                </p>
            </form>
        </Modal>
    )
}
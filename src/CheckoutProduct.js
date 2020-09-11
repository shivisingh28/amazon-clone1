import React ,{ forwardRef, useRef }from 'react';
//import FlipMove from "react-flip-move";
import './CheckoutProduct.css';
import StarIcon from '@material-ui/icons/Star';
import {useStateValue} from "./StateProvider";


const CheckoutProduct=forwardRef(({id,image,title,price,rating},ref)=> {
    const[{basket},dispatch] = useStateValue();
    const itemRef = useRef(null);
   
    const removeFromBasket =()=>{
       //Remove the item from the basket  
       dispatch({
           type:'REMOVE_FROM_BASKET',
           id:id,
       })   
    }
    return (
        <div className='checkoutProduct' ref={ref}>
            <img  className='checkoutProduct__image' src={image} alt="product"/>
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                    </p>
                    <div className='checkoutProduct__rating'>
                        { Array(rating)
                            .fill()
                            .map((_, index) => (
                                <StarIcon key={index} />
                            ))}
                   </div>
                   <button onClick={removeFromBasket}>Remove from Basket</button>
            </div> 
        </div>
    );
}
);
export default CheckoutProduct;

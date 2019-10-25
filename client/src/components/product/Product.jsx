import React,{ Fragment, useEffect, useState  } from  'react'
import { Redirect } from 'react-router-dom'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import Spinner from '../../utils/Spinner'
 import { getProduct } from '../../redux/actions/product'
 import { addComment, addLike, removeLike } from '../../redux/actions/product'
 import { addItemToCart } from '../../redux/actions/cart'
 import './product.css'
const Product = ({ addItemToCart, addComment, auth, match, getProduct, produit: { product }, company: { profileById}, addLike, removeLike }) => {
useEffect(()=> {
    getProduct(match.params.id)
}, [getProduct,match.params.id])
    const [comment, setComment] = useState('');  
    const onSubmit = e => {
        e.preventDefault();
        addComment(match.params.id, { comment })
        setComment('');
    }
    return(
        <Fragment>
        {product === null  ? <Spinner/>:( <Fragment>
            { auth.user !== null ? (
                 <Fragment>
                      {  auth.user._id === product.user &&<Redirect to='/company'/>}
                     <div className='product-container'>
                           <img src={product.imageUrl} alt='item'/>
                           <div className='column2'>
                              <h2> <b>Name       :    </b>    {' '+product.price+' '}   </h2>
                              <h2> <b>Price         :    </b>    {' '+product.price+' '}   </h2>
                              <h2> <b>size         :    </b>    {' '+product.price+' '}    </h2>
                              <h2> <b>Category      :    </b>    {' ' +product.category}    </h2>
                              <button className='addtocart' type='button' onClick= {()=> addLike(product._id)}><i className='fas fa-thumbs-up'/></button>          
                              <h1>{product.likes.length>0 && <span>{product.likes.length}</span>}</h1>
                              <button className='addtocart' type ='button' onClick={()=> removeLike(product._id)}><i className='fas fa-thumbs-down'/></button>      
                               <p><input onClick={()=> addItemToCart(product)} type = 'submit' value ='ADD To Cart' className='addtocart'/> </p> 
                              <h2> <b>Description   :    </b>    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit reiciendis accusantium ad impedit maiores culpa minima debitis, omnis veritatis, eveniet molestiae, repellat repellendus? Totam aliquid cupiditate expedita, sapiente nobis odit. </h2> 
                           </div>
                           <div className='column3'>
                               <form onSubmit = {e => onSubmit(e)}>
                               <textarea
                               name = "comment"
                               cols = "30"
                               rows = "5"
                               placeholder="Say Somthing about This Product :) "
                               value={comment}
                               onChange={e =>setComment(e.target.value)}
                                
                          />
                               <input type='submit' value='Comment' className='Comment'/>
                               </form>
                         
                           </div>
                           {product&& <div className='column4'>
                                   {product.comments&& product.comments.map(comment =>
                                     <div className='comment-container' key={comment._id}>
                                   <div className='box-I'>User Connecter</div>
                                  <div className='box-II'>{comment.text}</div>
                                  <div className='box-III'> Created At:  <Moment format='YYYY/MM/DD'>{comment.date}</Moment></div>
                                   </div>)}
                           </div>}
                           
                       </div>
                    
                      
                 </Fragment>
                ):(
                    <Redirect to='/login'/>) }
        </Fragment>) }
        </Fragment>
    ) 
    
}
const mapStateToProps = state =>{
    return({
    auth: state.auth,
    company: state.company,
    produit: state.produit
})}
export default connect(mapStateToProps, { addItemToCart,  getProduct, addComment, addLike, removeLike })(Product);


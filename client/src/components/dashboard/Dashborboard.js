import React, { useState, useEffect, Fragment } from 'react'
import openSocket from 'socket.io-client'
import { connect } from 'react-redux'
import Spinner from '../../utils/Spinner'
import './dashboard.css'
const Dashborboard = ({auth, company : { likes }}) => {
   const socket=  openSocket();

  const [notification, setNotifications] = useState([]);

  useEffect(() => {
     socket.on('aime', data =>{
       console.log(data)
       setNotifications(data.likes);
      })
       return () => {
        socket.off("aime");
      };
  }, [socket]) 
  console.log(notification) 
    return (
        <div className='dashborad-container '>
          <div className='test-box'>This Page will contain graphical statistics 
          <div style={{ color:'black', fontSize:'20px',  width: '50px', height: '50px',backgroundColor:'red', border: '1px solid white'}} >
         {notification.length}
          </div>
             </div> 
        
          <div className='Notifications'>
          
          <h1>Notification</h1>
            <div className='likes-box'>
             { notification.length>0 ? (
                 notification.map
                 (like=> like.avatar&&
                 <div key={like._id}>
                   <img src= {like.avatar} style= {{width: '100px', height: '100px', borderRadius: '50%'}}/>
                   </div> 
                )
             ) : (
               <Fragment>
                 { likes.length >0 && likes.map(like => like.avatar&& <div key = {like._id}> <img src= {like.avatar} style= {{width: '100px', height: '100px', borderRadius: '50%'}}/>
                 </div>) }
               </Fragment>
             )
            }
             
             
             
             
              </div>
          </div>
        
        </div>



  
      
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    company: state.company.profile
})
export default connect(mapStateToProps)(Dashborboard)

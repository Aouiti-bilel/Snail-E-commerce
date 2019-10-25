import React,{ useEffect } from 'react'
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profile'
import Spinner from '../../utils/Spinner';
import CompaniesItem from './CompaniesItem'

import './CompaniesItem.css'
const Companies =({getProfiles, company: { profiles, loading } }) => {
      useEffect(()=>{
          getProfiles()
      },[])
           
        return profiles.length<0 || loading ? (
            <Spinner/>
            ):( 
            <div className='companies'>
              {profiles
             .filter((item, index) => index<7) 
            .map(profile=>
            <CompaniesItem key={profile._id} profile ={profile}/>)}  
            </div>
        )
    }

const mapStateToProps = state =>({
    auth: state.auth,
    company: state.company
})
export default connect(mapStateToProps, { getProfiles })(Companies);









import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import './home.css'
import Spinner from '../utils/Spinner'
import ProfilesItem from './profilesItem'
import { getProfiles, getCurrentProfile } from '../redux/actions/profile'
import { getProducts } from '../redux/actions/product'

const Home = ({auth: { isAuthenticated },getCurrentProfile,  getProfiles, getProducts, company: { profile, profiles, loading }}) => {
    useEffect(()=>{
        getProfiles()
        getProducts()
        getCurrentProfile()
    },[]);
   
    return  profiles === null || loading ? ( <Spinner/> ):(
        <div className="homepage">
        {
            profiles
            .map(profile => 
                <div key ={profile._id} className='homepage'>
            <ProfilesItem  profile={profile}/>
            </div>
            )
        }
        </div>
    )
}
const mapStateToProps = state => ({
    products: state.produit,
    auth: state.auth,
    company: state.company
})
export default connect(mapStateToProps, { getCurrentProfile, getProfiles, getProducts })(Home);

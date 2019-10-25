import React from 'react'
import './CompaniesItem.css'
import {Link } from 'react-router-dom'
const CompaniesItem = ({ profile: { user, imageUrl } }) => {
    return (
            <Link style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
             }} 
             className="menu-item" 
             to ={`/profile/${user}`}>
             </Link>
    )
}

export default CompaniesItem

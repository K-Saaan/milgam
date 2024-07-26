import React from 'react'
import Background from "../components/Background"
import ProfileForm from '../components/Profile/ProfileForm'

function Profile(){
    return (
      <>
        <Background name={"내 프로필"} contents={<ProfileForm/ >}/>
      </>
    );
}

export default Profile;
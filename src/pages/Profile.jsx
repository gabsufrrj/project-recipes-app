import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" renderInput={ false } />
      <h1>
        Profile
      </h1>
      <Footer />
    </div>
  );
}

export default Profile;

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../CSS/Profile.css';

function Profile() {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  const email = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.email;
    }
    logout();
  };

  return (
    <div>
      <Header title="Profile" renderInput={ false } />
      <section className="profile-section">
        <h2 data-testid="profile-email">{email()}</h2>
        <div>
          <Link to="/done-recipes">
            <button
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </button>
          </Link>
          <button
            className="logout"
            data-testid="profile-logout-btn"
            type="button"
            onClick={ logout }
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;

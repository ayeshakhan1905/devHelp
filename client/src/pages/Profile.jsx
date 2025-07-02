import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("User in Profile →", user);

  if (!user) {
    return <h1>Loading user...</h1>;
  }

  return (
    <div>
      <h1>Hello {user.userName}</h1>
    </div>
  );
};

export default Profile;

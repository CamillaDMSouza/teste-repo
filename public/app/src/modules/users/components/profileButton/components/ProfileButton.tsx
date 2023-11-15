import React from 'react';
import { Button } from '../../../../../shared/components/button';

interface ProfileButtonProps {
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  return props.isLoggedIn ? (
    <Button
      text={
        <span>
          <a
            href={`./member/${props.username}`}
            style={{ color: 'white' }}
          >{`${props.username} / `}</a>
          {<u onClick={props.onLogout}>logout</u>}
          <br></br>
          <a href={`./statistics`} style={{ color: 'white' }}>
            Statistics
          </a>
        </span>
      }
      onClick={() => {}}
    />
  ) : (
    <Button
      text="Join"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/join';
        }
      }}
    />
  );
};

export default ProfileButton;

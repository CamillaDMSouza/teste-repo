import React from 'react';
import { Button } from '../../../../../shared/components/button';

interface StatsButtonProps {
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
}

const StatsButton: React.FC<StatsButtonProps> = (props) => {
  return props.isLoggedIn ? (
    <Button
      text={
        <span>
          <a
            href={`./member/${props.username}`}
            style={{ color: 'white' }}
          >{`${props.username} / `}</a>
          {<u onClick={props.onLogout}>logout</u>}
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

export default StatsButton;

import React from 'react';
import { Button } from '../../../../../shared/components/button';

interface MemberButtonProps {
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
}

const MemberButton: React.FC<MemberButtonProps> = (props) => {
  return props.isLoggedIn ? (
    <Button
      text={
        <span>
          <a href={`.member/statistics`} style={{ color: 'white' }}>
            Statistics /{' '}
          </a>
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

export default MemberButton;

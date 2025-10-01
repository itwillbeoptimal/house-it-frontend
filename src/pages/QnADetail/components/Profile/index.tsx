import React from 'react';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';

interface ProfileProps {
  profileUrl?: string;
  authorName: string;
  className?: string;
}

const Profile: React.FC<ProfileProps> = ({
  profileUrl,
  authorName,
  className,
}) => {
  return (
    <CommonStyles.ProfileWrapper className={className}>
      {profileUrl ? (
        <CommonStyles.ProfileImage
          src={profileUrl}
          alt={`${authorName} 프로필`}
        />
      ) : (
        <CommonStyles.DefaultProfile />
      )}
    </CommonStyles.ProfileWrapper>
  );
};

export default Profile;

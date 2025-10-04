import React from 'react';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import DefaultProfileImage from '@/assets/images/default-profile.png';

interface ProfileProps {
  profileUrl?: string;
  authorName: string;
}

const Profile: React.FC<ProfileProps> = ({ profileUrl, authorName }) => {
  return (
    <CommonStyles.ProfileWrapper>
      <CommonStyles.ProfileImage
        src={profileUrl || DefaultProfileImage}
        alt={`${authorName} 프로필`}
      />
    </CommonStyles.ProfileWrapper>
  );
};

export default Profile;

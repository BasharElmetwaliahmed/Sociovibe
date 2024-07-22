import ProfileSkeleton from '@/app/_components/profile/ProfileSkeleton'
import React from 'react'

function loading() {
  return (
    <div>
      {" "}
      <ProfileSkeleton />
    </div>
  );
}

export default loading
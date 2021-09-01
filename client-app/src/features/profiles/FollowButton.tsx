import React, { SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Reveal, Button } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
  profile: Profile;
}

export default observer(function FollowButton({profile}: Props) {

  const {profileStore, userStore} = useStore();
  const {updateFollowing, loading} = profileStore;

  if (userStore.user?.userName === profile.userName) return null;

  function handleFollow(e: SyntheticEvent, username: string) {
    // adding preventDefault because this button will be placed in the CardComponent with Link
    e.preventDefault();
    profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
  }
  return (
    <Reveal animated='move'>
            <Reveal.Content visible style={{width: '100%'}}>
              <Button
                fluid
                color='teal'
                content={profile.following ? 'Following' : "Not following"}/>
            </Reveal.Content>
            <Reveal.Content hidden style={{width: '100%'}}>
              <Button
                basic
                fluid
                color={profile.following ? 'red' : 'green'}
                content={profile.following ? 'Unfollow' : 'Follow'}
                loading={loading}
                onClick={(e) => handleFollow(e, profile.userName)}
                />
            </Reveal.Content>
          </Reveal>
  )
})
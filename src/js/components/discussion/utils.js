export let getDiscussionParticipantUsers = (users, participant_user_ids) => {
  if (!users) return null
  if(!participant_user_ids || participant_user_ids.length == 0) {
    return []
  }
  let participants = []
  for (let i=0; i<users.length; i++) {
    let user = users[i];
    if (participant_user_ids.includes(user.id)) {
      participants.push(user)
    }
  }
  return participants
};

export let getDiscussionUsersWithCheck = (users, participant_user_ids) => {
  if (!users) return null
  if(!participant_user_ids || participant_user_ids.length == 0) {
    return users
  }
    
  return users.map(user => {
    if (participant_user_ids.includes(user.id)) {
      return {
        ...user,
        is_participant: true
      }
    } else {
      return {
        ...user
      }
    }
  })
};
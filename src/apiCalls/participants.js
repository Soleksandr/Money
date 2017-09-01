export const getParticipants = () =>
  fetch('/backend/users/participants', {
    method: 'GET',
    credentials: 'include',
  }).then(participants => participants.json());

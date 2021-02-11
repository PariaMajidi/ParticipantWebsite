const prefix = "Participant-";

const getParticipant = (index) => `${prefix}${index}`;

const nextParticipant = (participant) => {
  const index = parseInt(participant.replace(prefix, ""), 10);

  return getParticipant(index + 1);
};

module.exports = { nextParticipant, getParticipant };

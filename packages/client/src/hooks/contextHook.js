import { createContext, useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const INITIAL_VALUE_TEAM_ID = {
  teamId: '',
  setTeamId: () => {},
};

// Create the initial Context Component
export const TeamIdContext = createContext(INITIAL_VALUE_TEAM_ID);

// This is an extra abstraction for the Context.Provider wrapper
// The Provider needs to wrap the children, where you will use the values from the context
export function TeamIdContextProvider({ children }) {
  // We are loading the initial data from the localstorage
  const valueFromLocalStorage = localStorage.getItem('teamId');
  const [teamId, setTeamId] = useState(valueFromLocalStorage);

  useEffect(() => {
    // Saving the "teamId" to localstorage so it persists the data inbetween reloads
    localStorage.setItem('teamId', teamId);
  }, [teamId]);

  return (
    <TeamIdContext.Provider
      value={{
        teamId,
        setTeamId,
      }}
    >
      {children}
    </TeamIdContext.Provider>
  );
}

TeamIdContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Extra abstraction, to shorten the code
// Originally we would need to use "useContext(TeamIdContext)" everywhere
// This way we only need to use "useTeamIdContext()"
export function useTeamIdContext() {
  const { teamId, setTeamId } = useContext(TeamIdContext);

  if (setTeamId === undefined) {
    throw new Error(
      'useTeamIdContext must be used within TeamIdContextProvider',
    );
  }

  return { teamId, setTeamId };
}

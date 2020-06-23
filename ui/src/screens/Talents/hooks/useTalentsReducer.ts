import axios from "axios";
import React from "react";
import { useRouteMatch } from "react-router-dom";

import { PostInterface } from "../../../types";

// State

type TalentsState = {
  fetched: boolean;
  more: boolean;
  talents: PostInterface[];
  activeTalent: PostInterface | undefined;
};

const initialState: TalentsState = {
  fetched: false,
  more: true,
  talents: [],
  activeTalent: undefined,
};

// Actions

const SET_ACTIVE_TALENT = "SET_ACTIVE_TALENT";
interface SetActiveTalentAction {
  type: typeof SET_ACTIVE_TALENT;
  payload?: string;
}

const UPDATE_TALENTS = "UPDATE_TALENTS";
interface UpdateTalentsAction {
  type: typeof UPDATE_TALENTS;
  payload: PostInterface[];
}

type TalentsActionTypes = SetActiveTalentAction | UpdateTalentsAction;

// Reducer

function TalentsReducer(state: TalentsState, action: TalentsActionTypes): TalentsState {
  switch (action.type) {
    case UPDATE_TALENTS: {
      const talents = state.talents;
      const fetchedTalents = action.payload;
      const combined = [...talents, ...fetchedTalents];
      return {
        ...state,
        fetched: true,
        more: fetchedTalents.length !== 0,
        talents: combined.map((talent: PostInterface) => ({
          ...talent,
          active: false,
        })),
      };
    }
    case SET_ACTIVE_TALENT: {
      const { payload: id } = action;
      const activeTalent = state.talents.find((talent: PostInterface) => talent.id === id);
      return {
        ...state,
        talents: state.talents.map((talent: PostInterface) => ({
          ...talent,
          active: talent === activeTalent,
        })),
        activeTalent,
      };
    }
    default:
      return state;
  }
}

// Hook

interface TalentsActions {
  setActiveTalent(id: string): void;
  updateTalents(talents: PostInterface[]): void;
}

export default function useTalentsReducer(): [TalentsState, TalentsActions] {
  const [state, dispatch] = React.useReducer(TalentsReducer, initialState);

  const setActiveTalent = React.useCallback((id?: string): void => {
    dispatch({ type: SET_ACTIVE_TALENT, payload: id });
  }, []);
  const updateTalents = React.useCallback((talents: PostInterface[]): void => {
    dispatch({ type: UPDATE_TALENTS, payload: talents });
  }, []);
  const actions: TalentsActions = React.useMemo(() => {
    return {
      setActiveTalent,
      updateTalents,
    };
  }, [setActiveTalent, updateTalents]);

  const match = useRouteMatch<{ id: string }>("/talents/:id");
  const id = match?.params.id;

  React.useEffect(() => {
    if (state.fetched) {
      const initialActiveId = id || state.talents[0].id;
      setActiveTalent(initialActiveId);
    }
  }, [id, setActiveTalent, state.fetched]);

  return [state, actions];
}

interface State {
  count: number;
}

export const initialState: State = {
  count: 0,
};

export function reducer(state: State, action: any) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };

    case "DECREMENT":
      return {
        count: state.count - 1,
      };

    case "RESET":
      return {
        count: 0,
      };

    default:
      return state;
  }
}

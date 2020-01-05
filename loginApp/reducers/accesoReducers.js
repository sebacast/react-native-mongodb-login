
const initialState = {
  email: '',
  codigo: '',
  macadr: '',
  mensaje: {},
  autorizado: false
}

const accesoReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL': {
      return {
        ...state,
        email: action.data,
      }
    }
    case 'UPDATE_CODIGO': {
      return {
        ...state,
        codigo: action.data,
      }
    }
    case 'UPDATE_MACADR': {
      return {
        ...state,
        macadr: action.data,
      }
    }
    case 'UPDATE_AUTORIZADO': {
      return {
        ...state,
        autorizado: action.data,
      }
    }
    case 'UPDATE_MENSAJE': {
      return {
        ...state,
        mensaje: action.data,
      }
    }
    case "RESET_ACC":
      return initialState;
    default: {
      return state;
    }
  }
};
export default accesoReducers
import { ipcRenderer } from 'electron'

const actions = {
  init: 'INITIALIZE',
  route: 'ROUTE',
  fetchCategories: 'FETCH_CATEGORIES',
  getCategories: 'GET_CATEGORIES',
  updateCategories: 'UPDATE_CATEGORIES',
  fetchAccounts: 'FETCH_ACCOUNTS',
  getAccounts: 'GET_ACCOUNTS',
  updateAccounts: 'UPDATE_ACCOUNTS',
}

export default actions

export function fetchCategories () {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('request-categories')
      ipcRenderer.once('get-categories', (event, categories) => {
        dispatch(getCategories(categories))
        resolve()
      })
      return {
        type: actions.fetchCategories
      }
    })
  }
}

export function getCategories (data) {
  return {
    type: actions.getCategories,
    categories: data.categories
  }
}

/*
export function updateCategories (data) {
  return (dispatch) => {
    ipcRenderer.send('update-categories', data)
    ipcRenderer.once('get-categories', (event, categories) => {
      dispatch(getCategories(categories))
    })
    return {
      type: actions.updateCategories
    }
  }
}
*/

export function fetchAccounts () {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('request-accounts')
      ipcRenderer.once('get-accounts', (event, accounts) => {
        dispatch(getAccounts(accounts))
        resolve()
      })
      return {
        type: actions.fetchAccounts
      }
    })
  }
}

export function getAccounts (data) {
  return {
    type: actions.getAccounts,
    accounts: data
  }
}

export function init () {
  return (dispatch) => {
    return Promise.all([
      dispatch(fetchCategories()),
      dispatch(fetchAccounts()),
    ]).then(() => {
      return Promise.resolve()
    })
  }
}

export function route (to) {
  return {
    type: actions.route,
    to
  }
}

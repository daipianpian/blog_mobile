import * as types from './mutation-types.js'
const actions = {
	changeClientWh({
		commit
	}, clientWh) {
		commit(types.CHANGE_CLIENT_WH, clientWh)
	}
}
export default actions
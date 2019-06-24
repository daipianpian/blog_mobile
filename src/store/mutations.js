import * as types from './mutation-types.js'
const mutations = {
	[types.CHANGE_CLIENT_WH](state, clientWh) {
		state.clientWidth = clientWh.clientWidth;
	}
}
export default mutations
import store from '../../../core/services/store';
import formatDistance from '@liberu-ui/date/src/formatDistance.js';

export default date => formatDistance(date, store.state.preferences.global.lang);

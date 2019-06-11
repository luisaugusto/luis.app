import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faCode,
	faTerminal,
	faDraftingCompass,
	faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCode, faTerminal, faDraftingCompass, faLayerGroup);
Vue.component('font-awesome-icon', FontAwesomeIcon);

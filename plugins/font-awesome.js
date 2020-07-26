import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faDev,
  faGithub,
  faTwitter,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { faHeart, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faDev,
  faGithub,
  faTwitter,
  faHeart,
  faComment,
  faCodeBranch,
  faLinkedin
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

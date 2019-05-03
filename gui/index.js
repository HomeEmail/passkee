import Vue from 'vue';
import Recorder from './src/Recorder.vue';
import VueCodemirror from 'vue-codemirror';
import 'puppeteer-domkit/browser/$Z';
import './src/assets/font/iconfont';
import './src/assets/font/iconfont.css';
import 'flex.css';
import './src/base.styl';
import './src/util/tnkGui';

import connection from './src/connection';

Vue.use(VueCodemirror);
const RecorderComponent = Vue.extend(Recorder);
const instance = new RecorderComponent({});
instance.vm = instance.$mount();
document.querySelector('html').appendChild(instance.$el);

console.log(instance);
instance.connection = connection;
window.PASSKEE_GUI = instance;

connection.send('resize', { width: window.outerWidth, height: window.outerHeight });

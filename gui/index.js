import Vue from 'vue';
import Recorder from './Recorder.vue';
import VueCodemirror from 'vue-codemirror';
import 'puppeteer-domkit/browser/$Z';
import './assets/font/iconfont';
import './assets/font/iconfont.css';
import 'flex.css';
import './assets/base.styl';
import './util/tnkGui';

Vue.use(VueCodemirror);
const RecorderComponent = Vue.extend(Recorder);
const instance = new RecorderComponent({});
instance.vm = instance.$mount();
document.querySelector('html').appendChild(instance.$el);

console.log(instance);
window.PDRGUI = instance;

console.log(`[pdr-command]resize=${window.outerWidth},${window.outerHeight - 20}`);

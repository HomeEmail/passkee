import Vue from 'vue';
import Recorder from './Recorder.vue';
const RecorderComponent = Vue.extend(Recorder);
const instance = new RecorderComponent({});
instance.vm = instance.$mount();
document.body.appendChild(instance.$el);

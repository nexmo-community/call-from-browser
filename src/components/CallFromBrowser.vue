<template>
  <main class="call-from-browser">
    <vue-tel-input @onInput="onInput">
    </vue-tel-input>
    <button class="call-control" v-bind:class="{'call-in-progress': callInProgress}"
            v-on:click="controlCallClick"></button>
    
    <p>{{infoMessage}}</p>
  </main>
</template>

<script>
import 'vue-tel-input/dist/vue-tel-input.css'
import VueTelInput from 'vue-tel-input'

export default {
  name: 'CallFromBrowser',
  components: {
      'vue-tel-input': VueTelInput
  },
  
  data() {
    return {
      phone: {
        number: '',
        isValid: false,
        country: {}
      },
      infoMessage: "",
      callInProgress: false
    }
  },

  created() {
    fetch('http://localhost:3000/no-auth')
      .then(response => {
        return response.json();
      })
      .then(json => {
          console.log(json)
      })
      .catch(error => {
        console.error(error)
      })
  },

  methods: {

    onInput({ number, isValid, country }) {
      this.phone.number = number;
      this.phone.isValid = isValid;
      this.phone.country = country;

      if(!isValid) {
        this.infoMessage = "Please enter a valid phone number"
      }
      else {
        this.infoMessage = `Thanks for entering a valid ${this.phone.country.name} phone number`
      }
    },

    controlCallClick() {
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-tel-input {
  width: 200px;
  margin: auto;
}

.call-control {
  font-size: 11em; 
}

.call-control:before {
  content: '☎️';
}

.call-control.off-hook:before {
  content: '📞'
}
</style>

<template>
  <main id="call-from-browser">
    <vue-tel-input @onInput="onInput">
    </vue-tel-input>
    <button class="call-control" v-bind:class="{'off-hook': offHook}"
            v-on:click="controlCallClick"></button>
    
    <p>{{infoMessage}}</p>
  </main>
</template>

<script>

import ConversationClient from 'nexmo-stitch'

export default {
  data() {
    return {
      phone: {
        number: '',
        isValid: false,
        country: {}
      },
      infoMessage: "",
      callStatus: "none"
    };
  },

  computed: {
    offHook() {
      return ['none', 'completed', 'rejected'].indexOf(this.callStatus) === -1
    }
  },

  created() {
    fetch('http://localhost:3000/no-auth')
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.conversationClient = new ConversationClient({debug: false})

        this.conversationClient.login(json.userJwt)
            .then(app => {
                this.app = app

                // When the active member (the user) makes a call
                // keep a reference to the Call object so we can
                // hang up later
                this.app.on("member:call", (member, call) => {
                    this.call = call
                });

                // Keep track of call status so we know how to
                // interact with the call e.g. hangup
                this.app.on("call:status:changed", (call) => {
                  this.callStatus = call.status
                })
            })
            .catch(error => {
                console.error(error)
            })
      })
  },

  methods: {

    /**
     * @param {string} number
     * the phone number inputted by user, will be formatted along with country code
     * // Ex: inputted: (AU) 0432 432 432
     * // number = '+61432421546'
     *
     * @param {Boolean} isValid
     * @param {string} country
     */
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
      if(this.offHook) {
        this.call.hangUp()
      }
      else if(this.phone.isValid) {
        this.app.callPhone(this.phone.number)
      }
    }

  }
};
</script>

<style>
#call-from-browser {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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

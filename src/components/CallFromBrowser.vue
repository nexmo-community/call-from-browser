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
import "vue-tel-input/dist/vue-tel-input.css";
import VueTelInput from "vue-tel-input";

import ConversationClient from "nexmo-stitch";

export default {
  name: "CallFromBrowser",
  components: {
    "vue-tel-input": VueTelInput
  },

  props: {
    jwtUrl: {
      type: String,
      default: process.env.VUE_APP_JWT_URL || "http://localhost:3000/no-auth"
    }
  },

  data() {
    return {
      phone: {
        number: "",
        isValid: false,
        country: {}
      },
      infoMessage: "",
      callInProgress: false
    };
  },

  created() {
    fetch(this.$props.jwtUrl)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.conversationClient = new ConversationClient({debug: true})

        return this.conversationClient.login(json.userJwt)
      })
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
          this.callInProgress =
            [
              "machine",
              "timeout",
              "unanswered",
              "rejected",
              "busy",
              "failed",
              "completed"
            ].indexOf(call.status) === -1;
        })
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

      if (!isValid) {
        this.infoMessage = "Please enter a valid phone number";
      } else {
        this.infoMessage = `Thanks for entering a valid ${
          this.phone.country.name
        } phone number`;
      }
    },

    controlCallClick() {
      if (this.callInProgress) {
        this.call.hangUp();
      } else if (this.phone.isValid) {
        this.app.callPhone(this.phone.number);
      }
    }
  }
};
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
  content: "☎️";
}

.call-control.call-in-progress:before {
  content: "📞";
}
</style>

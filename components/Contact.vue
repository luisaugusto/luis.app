<template>
  <section class="form">
    <form
      name="contact"
      method="post"
      netlify
      data-netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="bot-field" style="display:none;" />

      <label>
        <span
          :class="[
            'label-text',
            {
              active:
                labelStates.name.active || labelStates.name.text.length > 0
            }
          ]"
          >Name</span
        >
        <input
          :class="['box', { empty: labelStates.name.text.length === 0 }]"
          v-model="labelStates.name.text"
          type="text"
          name="name"
          required
          @focus="labelStates.name.active = true"
          @blur="labelStates.name.active = false"
        />
      </label>
      <label>
        <span
          :class="[
            'label-text',
            {
              active:
                labelStates.email.active || labelStates.email.text.length > 0
            }
          ]"
          >Email</span
        >
        <input
          :class="['box', { empty: labelStates.email.text.length === 0 }]"
          v-model="labelStates.email.text"
          type="email"
          name="email"
          required
          @focus="labelStates.email.active = true"
          @blur="labelStates.email.active = false"
        />
      </label>
      <label class="subject">
        <span
          :class="[
            'label-text',
            {
              active:
                labelStates.subject.active ||
                labelStates.subject.text.length > 0
            }
          ]"
          >Subject</span
        >
        <input
          :class="['box', { empty: labelStates.subject.text.length === 0 }]"
          v-model="labelStates.subject.text"
          type="text"
          name="subject"
          required
          @focus="labelStates.subject.active = true"
          @blur="labelStates.subject.active = false"
        />
      </label>
      <label class="textarea">
        <span
          :class="[
            'label-text',
            {
              active:
                labelStates.message.active ||
                labelStates.message.text.length > 0
            }
          ]"
          >Message</span
        >
        <textarea
          :class="['box', { empty: labelStates.message.text.length === 0 }]"
          ref="message"
          v-model="labelStates.message.text"
          name="message"
          rows="1"
          required
          @keydown="resizeTextarea"
          @keyup="resizeTextarea"
          @focus="labelStates.message.active = true"
          @blur="labelStates.message.active = false"
        />
      </label>
      <div>
        <button type="submit" :class="{ sending }">
          <template v-if="this.sending">Sending...</template>
          <template v-else>Send It</template>
        </button>
        <div v-if="status == 'success'" class="success">
          Thanks for your message!
        </div>
        <div v-if="status == 'error'" class="error">
          There was an error sending your message. Please try again or send me
          an email at <a href="mailto:hello@luis.codes">hello@luis.codes</a>.
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { setTimeout } from 'timers'
import axios from 'axios'

export default {
  data: () => ({
    labelStates: {
      name: {
        text: '',
        active: false
      },
      email: {
        text: '',
        active: false
      },
      subject: {
        text: '',
        active: false
      },
      message: {
        text: '',
        active: false
      }
    },
    sending: false,
    status: ''
  }),
  methods: {
    resizeTextarea() {
      const currentHeight = this.$refs.message.clientHeight
      this.$refs.message.removeAttribute('style')
      const newHeight = this.$refs.message.scrollHeight

      this.$refs.message.style.height = currentHeight + 'px'
      this.$refs.message.style.height = newHeight + 'px'
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    handleSubmit() {
      this.sending = true
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'contact',
            name: this.labelStates.name.text,
            email: this.labelStates.email.text,
            subject: this.labelStates.subject.text,
            message: this.labelStates.message.text
          }),
          axiosConfig
        )
        .then(() => {
          this.labelStates.name.text = ''
          this.labelStates.email.text = ''
          this.labelStates.subject.text = ''
          this.labelStates.message.text = ''
          this.status = 'success'
          this.sending = false

          setTimeout(() => {
            this.resizeTextarea()
          }, 2)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/colors';

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  label {
    position: relative;

    &.textarea,
    &.subject {
      grid-column: 1/-1;

      span.calc-line {
        white-space: pre-line;
        position: absolute;
        opacity: 0;
        z-index: -1;
        display: block;
        min-height: 41px;
      }
    }

    span.label-text {
      position: absolute;
      opacity: 0.7;
      z-index: -1;
      transition: all 0.3s;
      top: 0;
      padding: 15px;

      &.active {
        transform: translateY(-100%);
        font-size: 0.8em;
        padding: 0;
      }
    }

    input {
      box-sizing: border-box;
      height: 100%;
    }

    input,
    textarea {
      width: 100%;
      border: none;
      font-size: inherit;
      background: none;
      resize: none;
      padding: 0;
      color: $white;
      font-family: 'Recursive', Helvetica, sans-serif;
      transition: all 0.2s;

      &:invalid:not(.empty) {
        outline: none;
        background: rgba($red, 0.5);
      }

      &:invalid {
        box-shadow: none;
      }

      &:focus {
        border: 1px solid $white;
        background: rgba($blue, 0.5);
      }
    }

    textarea {
      transition: all 0.1s;
    }
  }

  > div {
    display: flex;
    grid-column: 1/-1;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;

    > div {
      margin-right: var(--spacing);
    }

    .error {
      color: $red;
    }

    button {
      background: $dark-blue;
      border: 1px solid $light-blue;
      padding: 15px;
      color: $white;
      font-family: 'Recursive', Helvetica, sans-serif;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.1s;

      &:hover {
        background: $blue;
      }

      &:focus {
        background: rgba($blue, 0.5);
        outline: none;
      }
    }
  }
}
</style>

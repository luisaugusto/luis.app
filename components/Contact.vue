<template>
  <div>
    <p>
      Feel free to contact me if you have any questions about my work, you want
      to build something awesome, or if you just want to chat.
    </p>
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
        <div v-if="status == 'success'" class="success" >
          Thanks for your message!
        </div>
        <div v-if="status == 'error'" class="error" >
          There was an error sending your message. Please try again or send me
          an email at <a href="mailto:hello@luis.codes">hello@luis.codes</a>.
        </div>
        <button type="submit" :class="{ sending }">
          <span v-if="this.sending">Sending...</span>
          <span v-else>Submit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { setTimeout } from 'timers';

export default {
	data() {
		return {
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
		};
	},
	methods: {
		resizeTextarea() {
			const currentHeight = this.$refs.message.clientHeight;
			this.$refs.message.removeAttribute('style');
			const newHeight = this.$refs.message.scrollHeight;

			this.$refs.message.style.height = currentHeight + 'px';
			this.$refs.message.style.height = newHeight + 'px';
		},
		encode(data) {
			return Object.keys(data)
				.map(
					key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
				)
				.join('&');
		},
		handleSubmit() {
			this.sending = true;
			const axiosConfig = {
				header: { 'Content-Type': 'application/x-www-form-urlencoded' }
			};
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
					this.labelStates.name.text = '';
					this.labelStates.email.text = '';
					this.labelStates.subject.text = '';
					this.labelStates.message.text = '';
					this.status = 'success';
					this.sending = false;

					setTimeout(() => {
						this.resizeTextarea();
					}, 2);
				})
				.catch(() => {
					this.status = 'error';
					this.sending = false;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
p {
  grid-column: 1/-1;
  font-size: 1.4em;
  margin: 0 0 var(--spacing);
  padding: var(--spacing) calc(var(--spacing) * 2);
  padding-top: 0;
  text-align: center;

  @media (max-width: 450px) {
    padding: var(--spacing);
  }
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--spacing);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  label {
    position: relative;
    font-size: 2em;

    @media (max-width: 650px) {
      font-size: 1.5em;
    }

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
      opacity: 0.5;
      z-index: -1;
      transition: all 0.3s;
      top: 0;

      &.active {
        transform: translateY(-100%);
        font-size: 0.5em;
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
      border-bottom: 3px solid var(--accent-color);
      font-size: inherit;
      background: none;
      resize: none;
      padding: 0;
      font-family: "Montserrat";
    }

    textarea {
      transition: all 0.1s;
    }
  }

  > div {
    display: flex;
    grid-column: 1/-1;
    justify-content: flex-end;
    align-items: center;

    > div {
      margin-right: var(--spacing);
    }

    .error {
      color: red;
    }
  }
}
</style>
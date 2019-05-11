<template>
  <form name="contact" netlify>
    <p>
      Feel free to contact me if you have any questions about my work, you want
      to build something awesome, or if you just want to chat.
    </p>
    <label>
      <span
        :class="[
          'label-text',
          {
            active: labelStates.name.active || labelStates.name.text.length > 0
          }
        ]"
        >Name</span
      >
      <input
        type="text"
        name="name"
        required
        @focus="labelStates.name.active = true"
        @blur="labelStates.name.active = false"
        v-model="labelStates.name.text"
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
        type="email"
        name="email"
        required
        @focus="labelStates.email.active = true"
        @blur="labelStates.email.active = false"
        v-model="labelStates.email.text"
      />
    </label>
    <label class="textarea">
      <span
        :class="[
          'label-text',
          {
            active:
              labelStates.message.active || labelStates.message.text.length > 0
          }
        ]"
        >Message</span
      >
      <textarea
        name="message"
        ref="message"
        rows="1"
        required
        @keydown="resizeTextarea"
        @keyup="resizeTextarea"
        @focus="labelStates.message.active = true"
        @blur="labelStates.message.active = false"
        v-model="labelStates.message.text"
      ></textarea>
    </label>
    <div>
      <button type="submit" @click="loadAnim = !loadAnim" :class="{ loadAnim }">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
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
        message: {
          text: '',
          active: false
        }
      },
      loadAnim: false
    };
  },
  methods: {
    resizeTextarea() {
      const currentHeight = this.$refs.message.clientHeight;
      this.$refs.message.removeAttribute('style');
      const newHeight = this.$refs.message.scrollHeight;

      this.$refs.message.style.height = currentHeight + 'px';
      this.$refs.message.style.height = newHeight + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: var(--spacing);

  > p {
    grid-row: 1/3;
    font-size: 1.4em;
    margin: 0;
    border-right: 3px solid var(--accent-color);
    border-bottom: 3px solid var(--accent-color);
    padding: calc(var(--spacing) / 2);
    padding-top: 0;
    padding-left: 0;
  }

  label {
    position: relative;
    font-size: 2em;

    &.textarea {
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
      font-family: 'Montserrat';
    }

    textarea {
      transition: all 0.1s;
    }
  }

  > div {
    display: flex;
    grid-column: 1/-1;
    justify-content: flex-end;

    button {
      font-size: 1.4em;
      border: none;
      background: var(--accent-color);
      box-shadow: none;
      color: white;
      padding: var(--spacing);
      transition: all 0.5s;

      $clip: var(--spacing);
      $nClip: calc(100% - #{$clip});
      clip-path: polygon(
        $clip 0,
        $nClip 0,
        100% $clip,
        100% $nClip,
        $nClip 100%,
        $clip 100%,
        0 $nClip,
        0 $clip
      );

      &:hover {
        border-radius: 100%;
        clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%);
      }
    }
  }
}
</style>

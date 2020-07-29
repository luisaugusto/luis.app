<template>
  <div class="social-media">
    <a
      href="https://dev.to/luisaugusto"
      target="_blank"
      title="Luis's Dev Blog"
      rel="noreferrer"
    >
      <font-awesome-icon :icon="['fab', 'dev']"></font-awesome-icon>
    </a>
    <a
      href="https://github.com/luisaugusto"
      target="_blank"
      title="Luis's Github Profile"
      rel="noreferrer"
    >
      <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
    </a>
    <a
      href="https://twitter.com/LegendOfLuis"
      target="_blank"
      title="Luis's Twitter Profile"
      rel="noreferrer"
    >
      <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
    </a>
    <a
      href="https://www.linkedin.com/in/luisbaugusto/"
      target="_blank"
      title="Luis's LinkedIn Profile"
      rel="noreferrer"
    >
      <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/colors';

div.social-media {
  display: inline-flex;
  align-items: center;
  margin: auto;
}

a {
  $transitionSpeed: 0.1s;

  color: $white;
  opacity: 0.8;
  position: relative;
  display: flex;
  font-size: 22px;

  + a {
    margin-left: 1em;
  }

  &,
  svg {
    transition: all $transitionSpeed $transitionSpeed/2;
    height: 1em;
  }

  &:after {
    content: '';
    width: 100%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 0;
    border: 1px solid $white;
    box-sizing: border-box;
    transition: all $transitionSpeed;
    transform: scale(0);
  }

  &:after,
  svg {
    transform-origin: center;
  }

  &:hover,
  &:focus {
    &,
    svg {
      transition: all $transitionSpeed;
    }

    &:after {
      transition: all $transitionSpeed $transitionSpeed/2;
    }
  }

  &:focus {
    outline: none;
    opacity: 0.85;

    &:after {
      transform: scale(1.3);
    }
  }

  &:hover {
    opacity: 1;

    svg {
      transform: scale(1.2);
    }

    &:after {
      transform: scale(1.7);
    }
  }

  &:active {
    svg {
      transition: all $transitionSpeed $transitionSpeed/2;
      transform: scale(1.1);
    }

    &:after {
      transition: all $transitionSpeed;
      transform: scale(1.4);
    }
  }
}
</style>

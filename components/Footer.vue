<template>
  <footer>
    <div class="version">
      v2.0.3
    </div>
    <a
      href="https://ecologi.com/luisaugusto"
      title="Ecologi"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="https://img.shields.io/badge/Plant%20a%20Tree-%F0%9F%8C%B3-green"
        alt="Plant a Tree"
      />
    </a>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    grid-row: 2/3;
    grid-column: 1/2;
  }

  .version {
    font-size: 12px;
    font-variation-settings: 'MONO' 1;
  }

  img {
    display: block;
  }
}
</style>

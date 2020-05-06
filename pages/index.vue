<template>
  <div class="page">
    <h1>Fullstack JavaScript Developer</h1>
    <p class="box">
      I help build scalable, secure, and performant web applications using
      JavaScript toolsets and frameworks, such as
      <span class="keyword">Node</span>, <span class="keyword">Vue</span>,
      <span class="keyword">Typescript</span>, and others.
    </p>
    <h2>What I have been up to</h2>
    <Articles></Articles>
    <h2>What I have been working on</h2>
    <Github></Github>
    <h2>Contact</h2>
    <Contact></Contact>
  </div>
</template>

<script>
import Articles from '~/components/Articles'
import Github from '~/components/Github'
import Contact from '~/components/Contact'

export default {
  components: {
    Articles,
    Github,
    Contact
  }
}
</script>

<template>
  <div class="page">
    <h1>Fullstack JavaScript Developer</h1>
    <p class="box">
      I help build scalable and secure web applications and components, using
      <span class="keyword">Node</span> for server side rendering,
      <span class="keyword">Vue</span> for frontend architecture, and
      <span class="keyword">Figma</span> for design and prototyping.
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

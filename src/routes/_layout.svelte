<script>
  import Nav from '../components/Nav.svelte'

  export let segment
</script>

<Nav {segment}/>

<main class="container py-5">
  <slot></slot>
</main>
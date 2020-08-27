<script context="module">
  export async function preload (page, session) {
    if (!session.user) {
      try {
        if (document) {
          const { Toast } = await import('svelma/dist/module')
          Toast.create('You must be logged in to access dashboard!')
        }
      } catch (e) {}
      return this.redirect(302, 'signin')
    }
  }
</script>
<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1>Only visible for logged users</h1>

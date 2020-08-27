<script>
  import { Toast } from 'svelma/dist/module'
  import { stores } from '@sapper/app'
  const { session } = stores()
  export let segment
  export let user

  $: if ($session.user) {
    user = $session.user
    Toast.create({ message: `Hello ${user.name}`, background: 'has-background-dark' })
  }

  import { onMount,afterUpdate } from 'svelte'
  import { goto } from '@sapper/app'

  onMount(() => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target
          const targetEl = document.getElementById(target)
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active')
          targetEl.classList.toggle('is-active')
        });
      });
    }
  });
       // in case you want to close it after user selects a different menu option
  afterUpdate(() => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger.is-active,.navbar-menu.is-active'), 0)
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach( el => {
        el.classList.toggle('is-active')
      })
    }
  })

  async function logout () {
    await fetch('/session', {
      method: 'DELETE'
    })
    goto('/')
    session.set({})
    user = null
  }
</script>

<style>
  .navbar-end {
    padding-right: 1rem;
  }
  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    bottom: -1px;
  }
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a 
        aria-current="{segment === undefined ? 'page' : undefined}" 
        href="." 
        class:has-background-light={segment === undefined}
        class:has-text-weight-semibold={segment === undefined}
        class="navbar-item">
        Home
      </a>

      <a 
        aria-current="{segment === 'about' ? 'page' : undefined}" 
        href="about" 
        class:has-background-light={segment === 'about'}
        class:has-text-weight-semibold={segment === 'about'}
        class="navbar-item">
        About
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if user}
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                {user.name}
              </a>
              <div class="navbar-dropdown">
                <a on:click={logout} class="navbar-item">
                  Logout
                </a>
              </div>
            </div>
            
          {:else}
            <button on:click={e => goto('signup')} class="button is-primary">
              <strong>Sign up</strong>
            </button>
            <button on:click={e => goto('signin')} class="button is-light">
              Log in
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

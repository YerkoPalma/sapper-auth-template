<script>
  import Field from 'svelma/src/components/Field.svelte'
  import Input from 'svelma/src/components/Input.svelte'
  import Button from 'svelma/src/components/Button.svelte'
  import { goto } from '@sapper/app'
  import { stores } from '@sapper/app'
  const { session } = stores()

  const credentials = {
    email: '',
    password: ''
  }
  let errors = {
    email: '',
    password: ''
  }
  let isDirty = false

  async function authenticate (usr) {
    isDirty = true
    if (credentials.email && credentials.password) {
      const res = await fetch('/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const json = await res.json()
      if (!res.ok) {
        errors = Object.assign(errors, json)
      } else {
        const { name, email } = json
        session.set({ user: { name, email } })
        goto('/')
      }
    } else {
      errors.email = !user.email ? 'This field is required' : ''
      errors.password = !user.password ? 'This field is required' : ''
    }
  }
</script>

<div class="tile is-ancestor">
  <div class="tile container is-parent is-6">
    <form class="tile is-child" on:submit|preventDefault={authenticate(credentials)}>
      <Field label="Email" type="{isDirty && errors.email ? 'is-danger' : ''}" message="{isDirty && errors.email}">
        <Input icon="envelope" type="email" bind:value={credentials.email}/>
      </Field>

      <Field label="Password" type="{isDirty && errors.password ? 'is-danger' : ''}" message="{isDirty && errors.password}">
        <Input icon="lock" type="password" bind:value={credentials.password}/>
      </Field>

      <Button type="is-primary" nativeType="submit">Submit</Button>
    </form>
  </div>
</div>
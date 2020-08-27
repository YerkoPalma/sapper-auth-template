<script>
  import Field from 'svelma/src/components/Field.svelte'
  import Input from 'svelma/src/components/Input.svelte'
  import Button from 'svelma/src/components/Button.svelte'

  const newUser = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }
  let errors = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }
  let isDirty = false

  async function saveUser (user) {
    isDirty = true
    // validate
    if (user.name && user.email && user.password && user.passwordConfirm) {
      errors.name = ''
      errors.email = ''
      if (user.password === user.passwordConfirm) {
        errors.passwordConfirm = ''
        if (user.password.length >= 6) {
          errors.password = ''
          const res = await fetch('/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          const json = await res.json()
          if (!res.ok) {
            errors = Object.assign(errors, json)
          } else {
            // TODO: Redirecto to signin page
            goto('/')
          }
        } else {
          errors.password = 'Password must be at least 6 characters'
        }
      } else {
        errors.password = 'Passwords do not match'
        errors.passwordConfirm = 'Passwords do not match'
      }
    } else {
      errors.name = !user.name ? 'This field is required' : ''
      errors.email = !user.email ? 'This field is required' : ''
      errors.password = !user.password ? 'This field is required' : ''
      errors.passwordConfirm = !user.passwordConfirm ? 'This field is required' : ''
    }
  }
</script>

<div class="tile is-ancestor">
  <div class="tile container is-parent is-6">
    <form class="tile is-child" on:submit|preventDefault={saveUser(newUser)}>
      <Field label="Name" type="{isDirty && errors.name ? 'is-danger' : ''}" message="{isDirty && errors.name}">
        <Input icon="user" bind:value={newUser.name}/>
      </Field>

      <Field label="Email" type="{isDirty && errors.email ? 'is-danger' : ''}" message="{isDirty && errors.email}">
        <Input icon="envelope" type="email" bind:value={newUser.email}/>
      </Field>

      <Field label="Password" type="{isDirty && errors.password ? 'is-danger' : ''}" message="{isDirty && errors.password}">
        <Input icon="lock" type="password" bind:value={newUser.password}/>
      </Field>

      <Field label="Confirm password" type="{isDirty && errors.passwordConfirm ? 'is-danger' : ''}" message="{isDirty && errors.passwordConfirm}">
        <Input icon="lock" type="password" bind:value={newUser.passwordConfirm}/>
      </Field>

      <Button type="is-primary" nativeType="submit">Submit</Button>
    </form>
  </div>
</div>

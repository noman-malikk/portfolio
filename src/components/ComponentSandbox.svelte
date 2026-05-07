<script lang="ts">
  type ComponentKey = 'Button' | 'Card' | 'Form';

  const components: ComponentKey[] = ['Button', 'Card', 'Form'];

  let selected: ComponentKey = 'Button';
  let hover = false;
  let focus = false;
  let disabled = false;
  let loading = false;

  const resetStates = () => {
    hover = false;
    focus = false;
    disabled = false;
    loading = false;
  };

  $: stateClasses = [hover && 'is-hover', focus && 'is-focus', disabled && 'is-disabled', loading && 'is-loading']
    .filter(Boolean)
    .join(' ');

  $: snippet = (() => {
    if (selected === 'Button') {
      return `<Button variant="primary" state={[${[hover && 'hover', focus && 'focus', disabled && 'disabled', loading && 'loading']
        .filter(Boolean)
        .join(', ')}]}>Deploy</Button>`;
    }
    if (selected === 'Card') {
      return `<Card tone="surface" state={[${[hover && 'hover', focus && 'focus', disabled && 'disabled', loading && 'loading']
        .filter(Boolean)
        .join(', ')}]}>Project summary</Card>`;
    }
    return `<Form layout="stacked" state={[${[hover && 'hover', focus && 'focus', disabled && 'disabled', loading && 'loading']
      .filter(Boolean)
      .join(', ')}]} />`;
  })();
</script>

<div class="sandbox">
  <div class="controls">
    <label>
      Component
      <select bind:value={selected} on:change={resetStates}>
        {#each components as component}
          <option value={component}>{component}</option>
        {/each}
      </select>
    </label>
    <label><input type="checkbox" bind:checked={hover} /> Hover</label>
    <label><input type="checkbox" bind:checked={focus} /> Focus</label>
    <label><input type="checkbox" bind:checked={disabled} /> Disabled</label>
    <label><input type="checkbox" bind:checked={loading} /> Loading</label>
  </div>

  <div class="preview">
    {#if selected === 'Button'}
      <button class={`sample button ${stateClasses}`} disabled={disabled} aria-busy={loading}>Deploy</button>
    {:else if selected === 'Card'}
      <div class={`sample card ${stateClasses}`}>
        <strong>Project summary</strong>
        <p>Responsive layout with modular sections and clear hierarchy.</p>
        {#if loading}
          <div class="skeleton"></div>
        {/if}
      </div>
    {:else}
      <form class={`sample form ${stateClasses}`}>
        <label>
          Name
          <input type="text" value="Noman" disabled={disabled} />
        </label>
        <label>
          Status
          <input type="text" value="Ready" disabled={disabled} />
        </label>
        <button type="button" disabled={disabled}>Submit</button>
      </form>
    {/if}
  </div>

  <div class="code">
    <div>
      <strong>Props</strong>
      <pre>{snippet}</pre>
    </div>
    <div>
      <strong>CSS notes</strong>
      <p>State classes add focus rings, motion cues, and progressive loading affordances.</p>
    </div>
  </div>
</div>

<style>
  .sandbox {
    display: grid;
    gap: 16px;
    min-width: 0;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    font-size: 0.85rem;
    align-items: center;
    min-width: 0;
  }

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  select {
    min-width: 0;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: #ffffff;
  }

  input[type='checkbox'] {
    accent-color: #0f766e;
  }

  .preview {
    padding: 16px;
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
    min-width: 0;
  }

  .sample {
    transition: 150ms ease;
  }

  .button {
    padding: 10px 18px;
    border-radius: 999px;
    border: none;
    background: #0f766e;
    color: #ffffff;
    font-weight: 600;
  }

  .card {
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: grid;
    gap: 6px;
  }

  .form {
    display: grid;
    gap: 10px;
  }

  .form label {
    display: grid;
    gap: 6px;
    font-size: 0.75rem;
  }

  .form input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .form button {
    padding: 8px 12px;
    border-radius: 999px;
    border: none;
    background: #0f766e;
    color: #ffffff;
  }

  .code {
    display: grid;
    gap: 12px;
    font-size: 0.85rem;
    color: #5f5a52;
    min-width: 0;
  }

  pre {
    background: rgba(15, 118, 110, 0.08);
    padding: 10px;
    border-radius: 10px;
    font-size: 0.75rem;
    overflow-x: auto;
    max-width: 100%;
  }

  @media (max-width: 520px) {
    .controls {
      display: grid;
      grid-template-columns: 1fr;
    }

    label {
      justify-content: space-between;
    }
  }

  .is-hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(15, 118, 110, 0.15);
  }

  .is-focus {
    outline: 3px solid rgba(15, 118, 110, 0.35);
    outline-offset: 3px;
  }

  .is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .is-loading {
    position: relative;
  }

  .is-loading::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: sweep 1.2s linear infinite;
  }

  .skeleton {
    height: 8px;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.1);
  }

  @keyframes sweep {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  :global([data-reduced-motion='true']) .is-loading::after {
    animation: none;
  }

  :global([data-theme='dark']) .preview,
  :global([data-theme='dark']) select {
    background: #1c1a16;
    color: #f7f3ed;
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme='dark']) pre {
    background: rgba(75, 210, 197, 0.12);
  }
</style>

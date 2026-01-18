<script lang="ts">
  const states = [
    {
      id: 'loading',
      label: 'Loading',
      message: 'Fetching data with optimistic skeletons and cancel-safe requests.',
      hint: 'Show skeletons + keep layout stable.'
    },
    {
      id: 'success',
      label: 'Success',
      message: 'Data resolved with contextual actions and clear status messaging.',
      hint: 'Surface next action with low friction.'
    },
    {
      id: 'empty',
      label: 'Empty',
      message: 'No data yet. Provide guided onboarding and a primary CTA.',
      hint: 'Explain the empty state in one sentence.'
    },
    {
      id: 'error',
      label: 'Error',
      message: 'API fallback with retries and human-readable error recovery.',
      hint: 'Offer retry + support access.'
    }
  ];

  let active = states[0].id;
  $: current = states.find((item) => item.id === active) ?? states[0];
</script>

<div class="flow">
  <div class="tabs">
    {#each states as state}
      <button class:active={state.id === active} on:click={() => (active = state.id)}>
        {state.label}
      </button>
    {/each}
  </div>
  <div class={`panel ${active}`}>
    <h4>{current.label} state</h4>
    <p>{current.message}</p>
    <div class="hint">{current.hint}</div>
  </div>
</div>

<style>
  .flow {
    display: grid;
    gap: 12px;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  button {
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: transparent;
    cursor: pointer;
    font-size: 0.8rem;
  }

  button.active {
    background: #0f766e;
    color: #ffffff;
    border-color: transparent;
  }

  .panel {
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
    display: grid;
    gap: 6px;
    font-size: 0.85rem;
  }

  .panel h4 {
    margin: 0;
  }

  .hint {
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(15, 118, 110, 0.08);
    color: #0b4f4b;
    font-size: 0.8rem;
  }

  :global([data-theme='dark']) .panel {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.1);
  }

  :global([data-theme='dark']) .hint {
    background: rgba(75, 210, 197, 0.14);
    color: #4bd2c5;
  }
</style>

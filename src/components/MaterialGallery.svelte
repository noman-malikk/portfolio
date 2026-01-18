<script lang="ts">
  let variant = 'contained';
  let state = 'default';
  let density = 'comfortable';

  const variants = ['contained', 'outlined', 'text'];
  const states = ['default', 'hover', 'focus', 'disabled'];

  const toggleDensity = () => {
    density = density === 'comfortable' ? 'compact' : 'comfortable';
  };
</script>

<div class="gallery">
  <div class="controls">
    <label>
      Variant
      <select bind:value={variant}>
        {#each variants as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </label>
    <label>
      State
      <select bind:value={state}>
        {#each states as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </label>
    <button class="toggle" on:click={toggleDensity}>
      Density: {density}
    </button>
  </div>

  <div class={`preview ${density}`}>
    <button class={`mui-button ${variant} ${state}`}>Action</button>
    <div class={`mui-chip ${state}`}>Chip</div>
    <label class={`mui-field ${state}`}>
      <span>Label</span>
      <input type="text" value="Input" readonly />
    </label>
  </div>

  <div class="tokens">
    <div class="token">
      <span class="swatch primary" />
      <div>
        <strong>Primary</strong>
        <div class="muted">#0f766e</div>
      </div>
    </div>
    <div class="token">
      <span class="swatch surface" />
      <div>
        <strong>Surface</strong>
        <div class="muted">Soft elevation</div>
      </div>
    </div>
    <div class="token">
      <span class="swatch focus" />
      <div>
        <strong>Focus ring</strong>
        <div class="muted">Accessible contrast</div>
      </div>
    </div>
  </div>
</div>

<style>
  .gallery {
    display: grid;
    gap: 16px;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  label {
    display: grid;
    gap: 6px;
    font-size: 0.8rem;
    color: #5f5a52;
  }

  select {
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: #ffffff;
  }

  .toggle {
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: transparent;
    font-weight: 600;
    cursor: pointer;
  }

  .preview {
    display: grid;
    gap: 12px;
    padding: 16px;
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
  }

  .preview.compact {
    gap: 8px;
    padding: 12px;
  }

  .mui-button {
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 600;
    border: none;
  }

  .mui-button.contained {
    background: #0f766e;
    color: #ffffff;
  }

  .mui-button.outlined {
    background: transparent;
    border: 1px solid rgba(15, 118, 110, 0.4);
    color: #0f766e;
  }

  .mui-button.text {
    background: transparent;
    color: #0f766e;
  }

  .mui-chip {
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.1);
    font-size: 0.85rem;
    width: fit-content;
  }

  .mui-field {
    display: grid;
    gap: 6px;
    font-size: 0.75rem;
    color: #5f5a52;
  }

  .mui-field input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .default {
    opacity: 1;
  }

  .hover {
    box-shadow: 0 8px 18px rgba(15, 118, 110, 0.18);
  }

  .focus {
    outline: 3px solid rgba(15, 118, 110, 0.35);
    outline-offset: 2px;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .tokens {
    display: grid;
    gap: 12px;
  }

  .token {
    display: flex;
    gap: 12px;
    align-items: center;
    font-size: 0.85rem;
  }

  .swatch {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .primary {
    background: #0f766e;
  }

  .surface {
    background: #efe9e0;
  }

  .focus {
    background: rgba(15, 118, 110, 0.2);
  }

  :global([data-theme='dark']) select,
  :global([data-theme='dark']) .preview,
  :global([data-theme='dark']) .toggle {
    background: #1c1a16;
    color: #f7f3ed;
    border-color: rgba(255, 255, 255, 0.15);
  }

  :global([data-theme='dark']) .mui-chip {
    background: rgba(75, 210, 197, 0.2);
  }

  :global([data-theme='dark']) .surface {
    background: #25221c;
  }
</style>

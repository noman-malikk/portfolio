<script lang="ts">
  const breakpoints = [
    {
      id: 'mobile',
      label: 'Mobile',
      max: 540,
      rules: ['Layout stacks to one column', 'Nav collapses into icon row', 'Compact padding (12px)']
    },
    {
      id: 'tablet',
      label: 'Tablet',
      max: 860,
      rules: ['Two-column grid', 'Nav expands to 4 links', 'Balanced padding (20px)']
    },
    {
      id: 'desktop',
      label: 'Desktop',
      max: 9999,
      rules: ['Three-column grid', 'Expanded nav + metadata', 'Generous padding (28px)']
    }
  ];

  let width = 720;

  $: active = breakpoints.find((point) => width <= point.max) ?? breakpoints[0];
</script>

<div class="playground">
  <div class="controls">
    <label class="slider">
      <span>Viewport width: {width}px</span>
      <input type="range" min="320" max="1040" step="10" bind:value={width} />
    </label>
    <div class="breakpoint">
      <span class="label">{active.label}</span>
      <span class="pill">{active.id}</span>
      <div class="tooltip" role="status" aria-live="polite">
        <strong>Active rules</strong>
        <ul>
          {#each active.rules as rule}
            <li>{rule}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="canvas">
    <div class={`frame ${active.id}`} style={`--demo-width: ${width}px`}>
      <div class="frame-header">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
        <span class="frame-title">UI Craft Layout</span>
      </div>
      <div class="frame-body">
        <div class="nav">
          <span class="nav-pill">Home</span>
          <span class="nav-pill">Projects</span>
          <span class="nav-pill">Skills</span>
          <span class="nav-pill">Contact</span>
        </div>
        <div class="tiles">
          <div class="tile">
            <strong>Hero</strong>
            <span>Headline + CTA</span>
          </div>
          <div class="tile">
            <strong>Metrics</strong>
            <span>Perf + audit</span>
          </div>
          <div class="tile">
            <strong>Details</strong>
            <span>Timeline info</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .playground {
    display: grid;
    gap: 20px;
    min-width: 0;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
  }

  .slider {
    display: grid;
    gap: 8px;
    min-width: min(220px, 100%);
    flex: 1;
  }

  input[type='range'] {
    width: 100%;
    accent-color: #0f766e;
  }

  .breakpoint {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(15, 118, 110, 0.2);
    background: rgba(15, 118, 110, 0.08);
  }

  .label {
    font-weight: 600;
  }

  .pill {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .tooltip {
    position: absolute;
    top: 120%;
    left: 0;
    width: 240px;
    padding: 12px;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
    font-size: 0.8rem;
    color: #2b2a27;
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: 150ms ease;
    z-index: 2;
  }

  .breakpoint:hover .tooltip,
  .breakpoint:focus-within .tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .tooltip ul {
    padding-left: 18px;
    margin: 8px 0 0;
  }

  .canvas {
    overflow-x: auto;
    padding-bottom: 6px;
    max-width: 100%;
  }

  .frame {
    width: var(--demo-width);
    max-width: 100%;
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    overflow: hidden;
    box-shadow: 0 18px 30px rgba(15, 23, 42, 0.12);
  }

  .frame-header {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 12px 16px;
    background: #f3f1ed;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d0c5bb;
  }

  .frame-title {
    margin-left: auto;
    font-size: 0.8rem;
    color: #605c56;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .frame-body {
    padding: 16px;
    display: grid;
    gap: 16px;
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .nav-pill {
    padding: 6px 12px;
    border-radius: 999px;
    background: #efe9e0;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .tiles {
    display: grid;
    gap: 10px;
  }

  .tile {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #ffffff;
    display: grid;
    gap: 4px;
  }

  .mobile .tiles {
    grid-template-columns: 1fr;
  }

  .tablet .tiles {
    grid-template-columns: repeat(2, 1fr);
  }

  .desktop .tiles {
    grid-template-columns: repeat(3, 1fr);
  }

  .mobile .nav-pill:nth-child(n + 3) {
    display: none;
  }

  .desktop .frame-body {
    padding: 26px;
  }

  :global([data-theme='dark']) .frame,
  :global([data-theme='dark']) .tooltip {
    background: #1c1a16;
    color: #f7f3ed;
    border-color: rgba(255, 255, 255, 0.1);
  }

  :global([data-theme='dark']) .frame-header {
    background: #232019;
  }

  :global([data-theme='dark']) .nav-pill {
    background: rgba(255, 255, 255, 0.08);
  }

  :global([data-theme='dark']) .tile {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 520px) {
    .breakpoint {
      width: 100%;
      justify-content: space-between;
    }

    .tooltip {
      left: auto;
      right: 0;
      width: min(240px, calc(100vw - 48px));
    }
  }
</style>

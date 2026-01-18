<script lang="ts">
  import { onMount } from 'svelte';

  let open = false;
  let focusRings = false;
  let headingMap = false;
  let checklist: Array<{ label: string; ok: boolean }> = [];

  const applyFlags = () => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-a11y-focus', focusRings ? 'true' : 'false');
    document.documentElement.setAttribute('data-a11y-headings', headingMap ? 'true' : 'false');

    if (headingMap) {
      document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
        heading.setAttribute('data-level', heading.tagName.toLowerCase());
      });
    } else {
      document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
        heading.removeAttribute('data-level');
      });
    }
  };

  const runChecklist = () => {
    if (typeof document === 'undefined') return;
    const images = Array.from(document.querySelectorAll('img'));
    const imagesHaveAlt = images.every((img) => img.getAttribute('alt'));
    const hasMain = Boolean(document.querySelector('main'));
    const navs = Array.from(document.querySelectorAll('nav'));
    const navLabels = navs.every((nav) => nav.getAttribute('aria-label'));
    const focusables = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const hasFocusables = focusables.length > 0;

    checklist = [
      { label: 'Images include alt text', ok: images.length === 0 || imagesHaveAlt },
      { label: 'Main landmark present', ok: hasMain },
      { label: 'Nav landmarks labeled', ok: navs.length === 0 || navLabels },
      { label: 'Keyboard focusable elements available', ok: hasFocusables }
    ];
  };

  const toggleOpen = () => {
    open = !open;
  };

  $: applyFlags();

  onMount(() => {
    applyFlags();
    runChecklist();
  });
</script>

<div class="inspector">
  <button class="trigger" on:click={toggleOpen}>
    A11y
  </button>
  {#if open}
    <div class="panel" role="dialog" aria-label="Accessibility inspector">
      <header>
        <strong>Accessibility Inspector</strong>
        <button class="close" on:click={toggleOpen}>Close</button>
      </header>
      <div class="toggles">
        <label><input type="checkbox" bind:checked={focusRings} /> Show focus rings</label>
        <label><input type="checkbox" bind:checked={headingMap} /> Highlight headings</label>
      </div>
      <button class="run" on:click={runChecklist}>Run checklist</button>
      <ul>
        {#each checklist as item}
          <li class:ok={item.ok} class:bad={!item.ok}>
            <span>{item.label}</span>
            <span>{item.ok ? 'Pass' : 'Check'}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .inspector {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 40;
    display: grid;
    gap: 10px;
  }

  .trigger {
    border-radius: 999px;
    border: none;
    background: #0f766e;
    color: #ffffff;
    padding: 10px 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .panel {
    width: 280px;
    padding: 14px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
    display: grid;
    gap: 12px;
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.12);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #5f5a52;
  }

  .toggles {
    display: grid;
    gap: 8px;
    font-size: 0.85rem;
  }

  .run {
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: transparent;
    padding: 8px 12px;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 6px;
    font-size: 0.8rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.04);
  }

  .ok {
    color: #0b4f4b;
    background: rgba(15, 118, 110, 0.12);
  }

  .bad {
    color: #7a3a14;
    background: rgba(243, 196, 106, 0.2);
  }

  :global([data-a11y-focus='true']) *:focus {
    outline: 3px dashed #f3c46a !important;
    outline-offset: 2px;
  }

  :global([data-a11y-headings='true']) h1,
  :global([data-a11y-headings='true']) h2,
  :global([data-a11y-headings='true']) h3,
  :global([data-a11y-headings='true']) h4,
  :global([data-a11y-headings='true']) h5,
  :global([data-a11y-headings='true']) h6 {
    position: relative;
    padding: 4px 8px;
    background: rgba(15, 118, 110, 0.12);
    border-radius: 8px;
  }

  :global([data-a11y-headings='true']) h1::after,
  :global([data-a11y-headings='true']) h2::after,
  :global([data-a11y-headings='true']) h3::after,
  :global([data-a11y-headings='true']) h4::after,
  :global([data-a11y-headings='true']) h5::after,
  :global([data-a11y-headings='true']) h6::after {
    content: attr(data-level);
    position: absolute;
    right: 8px;
    top: 6px;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #0b4f4b;
  }

  :global([data-theme='dark']) .panel {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme='dark']) .close,
  :global([data-theme='dark']) .run {
    color: #f7f3ed;
  }
</style>

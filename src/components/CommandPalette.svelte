<script lang="ts">
  import { onMount } from 'svelte';

  type Action = {
    label: string;
    type: 'section' | 'link' | 'toggle-theme' | 'toggle-motion';
    target?: string;
  };

  export let actions: Action[] = [];

  let open = false;
  let query = '';
  let activeIndex = 0;
  let inputEl: HTMLInputElement | null = null;

  $: filtered = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  $: activeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  const openPalette = () => {
    open = true;
    setTimeout(() => inputEl?.focus(), 0);
  };

  const closePalette = () => {
    open = false;
    query = '';
    activeIndex = 0;
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const toggleMotion = () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-reduced-motion') === 'true';
    const next = !current;
    root.setAttribute('data-reduced-motion', next ? 'true' : 'false');
    localStorage.setItem('reduced-motion', String(next));
  };

  const runAction = (action: Action) => {
    if (action.type === 'section' && action.target) {
      const target = document.querySelector(action.target);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
    if (action.type === 'link' && action.target) {
      window.open(action.target, '_blank', 'noreferrer');
    }
    if (action.type === 'toggle-theme') {
      toggleTheme();
    }
    if (action.type === 'toggle-motion') {
      toggleMotion();
    }
    closePalette();
  };

  onMount(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        open ? closePalette() : openPalette();
        return;
      }

      if (!open) return;

      if (event.key === 'Escape') {
        closePalette();
      }
      if (event.key === 'ArrowDown') {
        activeIndex = (activeIndex + 1) % Math.max(filtered.length, 1);
      }
      if (event.key === 'ArrowUp') {
        activeIndex = (activeIndex - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1);
      }
      if (event.key === 'Enter' && filtered[activeIndex]) {
        runAction(filtered[activeIndex]);
      }
    };

    const openButtons = Array.from(document.querySelectorAll('[data-command-open]'));
    openButtons.forEach((button) => {
      button.addEventListener('click', openPalette);
    });

    window.addEventListener('keydown', handleKey);

    return () => {
      openButtons.forEach((button) => {
        button.removeEventListener('click', openPalette);
      });
      window.removeEventListener('keydown', handleKey);
    };
  });
</script>

{#if open}
  <div class="overlay" on:click={closePalette}>
    <div class="palette" role="dialog" aria-label="Command palette" on:click|stopPropagation>
      <input
        bind:this={inputEl}
        type="text"
        placeholder="Search commands"
        bind:value={query}
        aria-label="Search commands"
      />
      <div class="list">
        {#each filtered as action, index}
          <button
            type="button"
            class:active={index === activeIndex}
            on:click={() => runAction(action)}
          >
            <span>{action.label}</span>
            <span class="meta">{action.type}</span>
          </button>
        {/each}
        {#if filtered.length === 0}
          <div class="empty">No matches. Try "Projects" or "Theme".</div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    display: grid;
    place-items: center;
    z-index: 50;
  }

  .palette {
    width: min(520px, 90vw);
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    display: grid;
    gap: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  input {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 0.95rem;
  }

  .list {
    display: grid;
    gap: 6px;
    max-height: 240px;
    overflow: auto;
  }

  button {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  button.active {
    border-color: rgba(15, 118, 110, 0.4);
    background: rgba(15, 118, 110, 0.08);
  }

  .meta {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #5f5a52;
  }

  .empty {
    font-size: 0.85rem;
    color: #5f5a52;
    padding: 8px 4px;
  }

  :global([data-theme='dark']) .palette {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme='dark']) input {
    background: #1c1a16;
    color: #f7f3ed;
    border-color: rgba(255, 255, 255, 0.12);
  }
</style>

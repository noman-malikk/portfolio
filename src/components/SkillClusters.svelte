<script lang="ts">
  export let clusters: ReadonlyArray<{
    name: string;
    items: ReadonlyArray<string>;
    usage: string;
  }> = [];

  let open = clusters[0]?.name ?? '';

  const toggle = (name: string) => {
    open = open === name ? '' : name;
  };
</script>

<div class="clusters">
  {#each clusters as cluster}
    <button
      type="button"
      class={`cluster ${open === cluster.name ? 'open' : ''}`}
      on:click={() => toggle(cluster.name)}
    >
      <div class="cluster-head">
        <span>{cluster.name}</span>
        <span class="hint">{open === cluster.name ? 'Collapse' : 'Expand'}</span>
      </div>
      {#if open === cluster.name}
        <div class="cluster-body">
          <div class="items">
            {#each cluster.items as item}
              <span>{item}</span>
            {/each}
          </div>
          <p>{cluster.usage}</p>
        </div>
      {/if}
    </button>
  {/each}
</div>

<style>
  .clusters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .cluster {
    text-align: left;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
    cursor: pointer;
    display: grid;
    gap: 12px;
  }

  .cluster-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-weight: 600;
  }

  .hint {
    font-size: 0.75rem;
    color: #5f5a52;
  }

  .cluster-body {
    display: grid;
    gap: 10px;
    font-size: 0.85rem;
    color: #5f5a52;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .items span {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-size: 0.75rem;
  }

  .open {
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
  }

  :global([data-theme='dark']) .cluster {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme='dark']) .items span {
    border-color: rgba(255, 255, 255, 0.2);
  }
</style>

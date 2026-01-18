<script lang="ts">
  const base = { performance: 62, seo: 68, best: 70 };
  const weights = {
    lazy: { performance: 10, seo: 2 },
    split: { performance: 8, best: 4 },
    image: { performance: 12, seo: 4 },
    cache: { performance: 6, best: 6 }
  };

  let lazy = true;
  let split = true;
  let image = true;
  let cache = true;

  const compute = () => {
    const perf =
      base.performance +
      (lazy ? weights.lazy.performance : -6) +
      (split ? weights.split.performance : -8) +
      (image ? weights.image.performance : -10) +
      (cache ? weights.cache.performance : -6);
    const seo = base.seo + (lazy ? weights.lazy.seo : -4) + (image ? weights.image.seo : -6);
    const best = base.best + (split ? weights.split.best : -4) + (cache ? weights.cache.best : -6);
    return {
      performance: Math.min(98, Math.max(35, perf)),
      seo: Math.min(96, Math.max(40, seo)),
      best: Math.min(96, Math.max(45, best))
    };
  };

  $: scores = compute();
  $: lcp = lazy && image ? '1.8s' : '3.1s';
  $: tti = split ? '2.4s' : '3.6s';
  $: cls = cache ? '0.06' : '0.18';
</script>

<div class="perf-lab">
  <div class="toggles">
    <label><input type="checkbox" bind:checked={lazy} /> Lazy load media</label>
    <label><input type="checkbox" bind:checked={split} /> Code splitting</label>
    <label><input type="checkbox" bind:checked={image} /> Image optimization</label>
    <label><input type="checkbox" bind:checked={cache} /> CDN caching</label>
  </div>

  <div class="audit">
    <div class="score">
      <span>Performance</span>
      <strong>{scores.performance}</strong>
      <div class="bar"><span style={`width:${scores.performance}%`}></span></div>
    </div>
    <div class="score">
      <span>SEO</span>
      <strong>{scores.seo}</strong>
      <div class="bar"><span style={`width:${scores.seo}%`}></span></div>
    </div>
    <div class="score">
      <span>Best Practices</span>
      <strong>{scores.best}</strong>
      <div class="bar"><span style={`width:${scores.best}%`}></span></div>
    </div>
  </div>

  <div class="metrics">
    <div>
      <strong>LCP</strong>
      <span>{lcp}</span>
    </div>
    <div>
      <strong>TTI</strong>
      <span>{tti}</span>
    </div>
    <div>
      <strong>CLS</strong>
      <span>{cls}</span>
    </div>
  </div>
</div>

<style>
  .perf-lab {
    display: grid;
    gap: 16px;
  }

  .toggles {
    display: grid;
    gap: 8px;
    font-size: 0.85rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input[type='checkbox'] {
    accent-color: #0f766e;
  }

  .audit {
    display: grid;
    gap: 12px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
  }

  .score {
    display: grid;
    gap: 6px;
  }

  .score strong {
    font-size: 1.4rem;
  }

  .bar {
    height: 6px;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.12);
    overflow: hidden;
  }

  .bar span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #0f766e, #f3c46a);
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
    font-size: 0.85rem;
    color: #5f5a52;
  }

  .metrics strong {
    display: block;
    color: #1e1b16;
  }

  :global([data-theme='dark']) .audit {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.12);
  }

  :global([data-theme='dark']) .metrics strong {
    color: #f7f3ed;
  }
</style>

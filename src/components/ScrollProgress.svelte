<script lang="ts">
  import { onMount } from 'svelte';

  let progress = 0;

  onMount(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      progress = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  });
</script>

<div class="scroll-progress" aria-hidden="true">
  <span style={`width: ${progress}%`} />
</div>

<style>
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    z-index: 30;
  }

  .scroll-progress span {
    display: block;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, #0f766e, #f3c46a);
    transition: width 120ms ease;
  }
</style>

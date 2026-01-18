<script lang="ts">
  export let email = '';
  let status = 'Copy email';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      status = 'Copied!';
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      status = 'Copied!';
    }

    setTimeout(() => {
      status = 'Copy email';
    }, 1800);
  };
</script>

<button class="copy" on:click={copyEmail}>{status}</button>

<style>
  .copy {
    width: 100%;
    padding: 12px 16px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: transparent;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 12px;
  }

  :global([data-theme='dark']) .copy {
    border-color: rgba(255, 255, 255, 0.12);
    color: #f7f3ed;
  }
</style>

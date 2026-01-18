<script lang="ts">
  type Block = {
    index: number;
    action: string;
    payload: string;
    timestamp: string;
    prevHash: string;
    hash: string;
  };

  const candidates = ['Candidate A', 'Candidate B', 'Candidate C'];

  let voterId = '';
  let selectedCandidate = candidates[0];
  let chain: Block[] = [];
  let status = 'Ready to simulate blocks.';
  let verification = 'Not verified yet.';

  const hashString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `0x${hex}${hex.slice(0, 4)}`;
  };

  const createBlock = (index: number, action: string, payload: string, prevHash: string): Block => {
    const timestamp = new Date().toISOString();
    const hash = hashString(`${index}|${action}|${payload}|${timestamp}|${prevHash}`);
    return { index, action, payload, timestamp, prevHash, hash };
  };

  const addBlock = (action: string, payload: string) => {
    const prevHash = chain.length ? chain[chain.length - 1].hash : '0xGENESIS';
    const next = createBlock(chain.length, action, payload, prevHash);
    chain = [...chain, next];
  };

  const ensureGenesis = () => {
    if (chain.length === 0) {
      addBlock('GENESIS', 'Network boot sequence');
    }
  };

  const register = () => {
    ensureGenesis();
    if (!voterId.trim()) {
      voterId = `VOTER-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
    }
    addBlock('REGISTER', `Voter ${voterId} registered`);
    status = 'Registration block added.';
  };

  const castVote = () => {
    if (!voterId.trim()) {
      status = 'Register first to cast a vote.';
      return;
    }
    addBlock('VOTE', `${voterId} voted for ${selectedCandidate}`);
    status = 'Vote block added.';
  };

  const verifyChain = () => {
    if (chain.length === 0) {
      verification = 'No blocks to verify yet.';
      return;
    }
    const ok = chain.every((block, index) => {
      const prev = index === 0 ? '0xGENESIS' : chain[index - 1].hash;
      const expectedHash = hashString(
        `${block.index}|${block.action}|${block.payload}|${block.timestamp}|${block.prevHash}`
      );
      return block.prevHash === prev && block.hash === expectedHash;
    });
    verification = ok ? 'Chain verified. All hashes align.' : 'Integrity check failed. Hash mismatch detected.';
  };

  ensureGenesis();
</script>

<div class="trust-demo">
  <div class="steps">
    <div class="step">
      <h4>1. Register</h4>
      <input type="text" placeholder="Voter ID" bind:value={voterId} />
      <button class="btn" on:click={register}>Register</button>
    </div>
    <div class="step">
      <h4>2. Cast vote</h4>
      <select bind:value={selectedCandidate}>
        {#each candidates as candidate}
          <option value={candidate}>{candidate}</option>
        {/each}
      </select>
      <button class="btn" on:click={castVote}>Cast vote</button>
    </div>
    <div class="step">
      <h4>3. Verify</h4>
      <button class="btn btn-outline" on:click={verifyChain}>Verify chain</button>
      <p class="verification">{verification}</p>
    </div>
  </div>

  <div class="status">{status}</div>

  <div class="chain">
    {#each chain as block}
      <div class="block">
        <div class="block-header">
          <span class="index">Block {block.index}</span>
          <span class="hash">{block.hash}</span>
        </div>
        <p class="action">{block.action}</p>
        <p class="payload">{block.payload}</p>
        <p class="meta">Prev: {block.prevHash}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .trust-demo {
    display: grid;
    gap: 20px;
    margin-top: 20px;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }

  .step {
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.9);
    display: grid;
    gap: 10px;
  }

  .step h4 {
    margin: 0;
    font-size: 0.95rem;
  }

  input,
  select {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
  }

  .btn {
    border-radius: 999px;
    border: none;
    background: #0f766e;
    color: #ffffff;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-outline {
    background: transparent;
    color: #0f766e;
    border: 1px solid rgba(15, 118, 110, 0.4);
  }

  .status {
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.12);
    font-size: 0.85rem;
    color: #0b4f4b;
  }

  .verification {
    font-size: 0.8rem;
    color: #5f5a52;
  }

  .chain {
    display: grid;
    gap: 10px;
    max-height: 260px;
    overflow: auto;
    padding-right: 6px;
  }

  .block {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
    display: grid;
    gap: 4px;
  }

  .block-header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.75rem;
    color: #5f5a52;
  }

  .action {
    margin: 0;
    font-weight: 600;
  }

  .payload,
  .meta {
    margin: 0;
    font-size: 0.8rem;
    color: #5f5a52;
  }

  :global([data-theme='dark']) .step,
  :global([data-theme='dark']) .block {
    background: #1c1a16;
    border-color: rgba(255, 255, 255, 0.1);
  }

  :global([data-theme='dark']) input,
  :global([data-theme='dark']) select {
    background: #1c1a16;
    color: #f7f3ed;
    border-color: rgba(255, 255, 255, 0.2);
  }

  :global([data-theme='dark']) .status {
    background: rgba(75, 210, 197, 0.12);
    color: #4bd2c5;
  }
</style>

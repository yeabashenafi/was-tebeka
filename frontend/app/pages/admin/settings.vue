<template>
  <div class="p-6 max-w-5xl space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Security & Triage Policies</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">
        System-wide cryptographic protocols, survivor anonymity bounds, and emergency thresholds.
      </p>
    </div>

    <!-- Card 1: Cryptographic Anonymity Architecture -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-primary-500" />
          <h2 class="text-lg font-bold">Cryptographic Anonymity Architecture</h2>
        </div>
      </template>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">SHA-256 One-Way Token Hashing</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Intake generates ephemeral client tokens; the database retains only SHA-256 digests. Plaintext recovery tokens are never persisted.
            </p>
          </div>
          <UBadge color="emerald" variant="subtle">Active (Enforced)</UBadge>
        </div>

        <UDivider />

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Strict Zero-PII Geo Fencing</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Restricts incident intake coordinates to broad administrative tiers (sub-city/district) to prevent physical tracking.
            </p>
          </div>
          <UBadge color="emerald" variant="subtle">Strict</UBadge>
        </div>

        <UDivider />

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Zero-Trace Header Scrubbing</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Client IP addresses and user-agent strings are stripped prior to ledger persistence.
            </p>
          </div>
          <UBadge color="emerald" variant="subtle">Enabled</UBadge>
        </div>
      </div>
    </UCard>

    <!-- Card 2: Clinical & Statutory Triage Triggers -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-clock" class="w-6 h-6 text-amber-500" />
          <h2 class="text-lg font-bold">Clinical & Statutory Triage Triggers</h2>
        </div>
      </template>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">WHO 72-Hour Medical Escalation</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Automated triage priority escalation for sexual assault reports to support the Post-Exposure Prophylaxis (PEP) clinical window.
            </p>
          </div>
          <UBadge color="amber" variant="subtle">72h Window</UBadge>
        </div>

        <UDivider />

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">FDRE Criminal Code Statutory Mapping</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pre-categorizes incoming narrative classifications against Arts. 564, 565, and 620.
            </p>
          </div>
          <UBadge color="primary" variant="subtle">v2004 Code</UBadge>
        </div>
      </div>
    </UCard>

    <!-- Card 3: Quick Exit Panic Protocol -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-6 h-6 text-rose-500" />
          <h2 class="text-lg font-bold">Quick Exit Panic Protocol</h2>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Target neutral destination triggered when the floating panic button is clicked on any public page.
        </p>
        
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <UInput 
            model-value="https://www.google.com" 
            disabled 
            class="flex-1 max-w-md" 
            icon="i-heroicons-link"
          />
          <UBadge color="rose" variant="subtle">Immediate Session Flush + History Replace</UBadge>
        </div>
      </div>
    </UCard>

  </div>
</template>

<script setup lang="ts">
// This page is a strictly static operational dashboard for policy viewing.
</script>

<template>
  <div class="rounded-md overflow-hidden border border-grey-300 shadow w-full bg-white" v-on="$listeners">
    <slot name="image" />
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

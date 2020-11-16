<template>
  <div>
    <h3 class="font-raleway-bold text-xl uppercase tracking-wide">
      <slot />
    </h3>
    <h5 v-if="$slots.subheader" class="text-sm text-grey-600">
      <slot name="subheader" />
    </h5>
  </div>
</template>

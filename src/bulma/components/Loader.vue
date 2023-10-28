<template>
  <core-loader>
    <template #default="{ visible, progress }">
      <progress-bar
        :progress="progress"
        :transition="0.3"
        color="#f44336"
        position="fixed"
        v-if="visible"
      />
    </template>
  </core-loader>
</template>

<script setup>
import ProgressBar from "@liberu-ui/progress-bar";
import CoreLoader from "../../core/components/Loader.vue";
</script>

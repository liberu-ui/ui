<template>
  <pull-to-refresh :config="config" :on-refresh="refresh">
    <slide enter="down" leave="up">
      <navbar />
    </slide>
  </pull-to-refresh>
</template>

<script setup>
import { Slide } from "@liberu-ui/transitions";
import PullToRefresh from "@liberu-ui/pull-to-refresh";
import Navbar from "./Navbar.vue";
const i18n = inject("i18n");

const config = reactive({
  startLabel: v.i18n("Pull down to refresh"),
  readyLabel: v.i18n("Release to refresh"),
  loadingLabel: v.i18n("Refreshing..."),
  errorLabel: v.i18n("Something wrong happened"),
});

function refresh() {
  return new Promise(() => window.location.reload(true));
}
</script>

<style>
.pull-down-header {
  z-index: 1000;
}
</style>

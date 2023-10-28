<template>
  <nav class="breadcrumb is-small is-bold has-dot-separator">
    <ul>
      <core-breadcrumbs>
        <template #default="{ breadcrumbs, hasNavigation }">
          <li
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.name"
            :class="{ 'is-active': !hasNavigation(breadcrumb) }"
          >
            <router-link
              v-if="breadcrumb.route"
              :to="{ name: breadcrumb.route }"
            >
              {{ i18n(breadcrumb.name) }}
            </router-link>
            <a v-else>
              {{ i18n(breadcrumb.name) }}
            </a>
          </li>
        </template>
      </core-breadcrumbs>
    </ul>
  </nav>
</template>

<script setup>
import CoreBreadcrumbs from "../../core/components/Breadcrumbs.vue";

const i18n = inject("i18n");
</script>

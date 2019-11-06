<template>
  <div>
    <page-header/>
    <div class="app-container" style="top:-40px;position:relative">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader'
export default {
  name: 'Layout',
  components: {
    PageHeader
  }
}
</script>


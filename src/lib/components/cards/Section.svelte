<script lang="ts">
  export let title = '';
</script>

<section class="flex flex-col mx-2 rounded-lg mt-2 variant-outline"> 
  <header class="h5 variant-soft p-4 font-bold">{title}</header>
  <hr class="!border-t-2" />
<slot></slot>
</section>
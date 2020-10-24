<template>
  <q-menu touch-position context-menu>
    <q-list dense style="width: 200px">
      <q-item dense clickable v-close-popup>
        <q-item-section>
          <span
            >Build with ❤️ by
            <a href="http://tranmani.com" target="_blank">tranmani</a></span
          ></q-item-section
        >
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: "RightClickMenu",
};
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
*:focus {
  outline: none !important;
}
a {
  display: inline-block;
  position: relative;
  color: #343434;
  text-decoration: none;
  padding: 0 6px;
  &:before,
  &:after {
    will-change: transform;
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
  }
  &:before {
    transition: 100ms ease-out 50ms;
    transform-origin: 0 24px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: mix(#f1f1f1, #0077ff, 80%);
  }
  &:after {
    transition: 50ms ease-out;
    transform: scaleX(0);
    transform-origin: left center;
    bottom: 2px;
    right: -12px;
    border: 8px solid transparent;
    border-left-color: mix(#f1f1f1, #0077ff, 60%);
  }
  &:hover {
    &:before {
      transition: 100ms ease-out;
      transform: scaleY(0.18);
      background: mix(#f1f1f1, #0077ff, 60%);
    }
    &:after {
      transition: 50ms ease-out 100ms;
      transform: none;
    }
  }
  &:active {
    &:before {
      transition: 100ms ease-in;
      background: mix(#f1f1f1, #0077ff, 40%);
    }
    &:after {
      transition: 100ms ease-in;
      border-left-color: mix(#f1f1f1, #0077ff, 40%);
    }
  }
}
</style>

<template>
  <router-link
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </router-link>
</template>

<style lang="scss" scoped>


.logo{
    font-family: "Oswald", sans-serif;
    font-size: 20px;
    color: $black;
    text-decoration: none;
    span {
        color: $primary;
        &:hover{
            color: $black;
    }
    }

}
</style>
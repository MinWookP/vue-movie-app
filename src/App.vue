<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from './componets/Header';
import Footer from './componets/Footer';

export default{
    components:{
        Header,
        Footer
    }
}
</script>


<style lang="scss">


// scoped를 제거해서 유효범위를 가지지 않게 한다.
// 모든 컴포넌트에서 스타일 적용이 가능해진다.
</style>
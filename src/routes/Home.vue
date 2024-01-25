<template>
  <Headline />
  <Search />
  <MovieList />
</template>


<script>
import Headline from '../componets/Headline';
import Search from '../componets/Search';
import MovieList from '../componets/MovieList';

export default{
    components:{
        Headline,
        Search,
        MovieList
    },
    created() {
    this.$store.commit('movie/resetMovies')
  }
}


</script>
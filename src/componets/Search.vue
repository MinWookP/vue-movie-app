<template>  
  <div class="container">
    <input
      v-model="title"
      type="text"
      class="form-control"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply">
    <div class="selects">
      <select
        v-for="filter in filters"
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for=" item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      @click="apply"
      class="btn btn-primary">
      Apply
    </button>
  </div>
</template>


<script>

export default{
    data(){
        return{
            title:'',
            type: 'movie',
            number: 10,
            year: '',
            filters: [
                {
                    name:'type',
                    items: ['movie','serise','episode']
                },
                {
                    name:'number',
                    items:[10,20,30]
                },
                {
                    name: 'year',
                    items: (()=>{
                        const years =[]
                        const thisYear = new Date().getFullYear()
                        for(let i = thisYear; i >= 1950; i -= 1){
                            years.push(i)
                        }

                        return years
                    })()
                }
            ],
        }
    },
    methods:{
        apply(){
            this.$store.dispatch('movie/searchMovies',{
                title: this.title,
                type: this.type,
                number: this.number,
                year: this.year
            })
            } 
        }
    }


// Store의 Mutations를 실행할때는 .commit() 메소드를, Actions를 실행할때는 .dispatch() 메소드를 사용
// v-model="$data[filter.name]" 점표기법 외에 대괄호를 사용하여 문자 데이터로 해서 동적 데이터 사용
</script>



<style lang="scss" scoped>

.container{
    display: flex;
    >*{
        margin-right: 10px;
        font-size: 15px;
        &:last-child{
            margin-right: 0;
        }
    }
    .selects{
        display: flex;
        select{
            width: 120px;
            margin-right: 10px;
        }
        &:last-child{
            margin-right: 0;
        }
    }
    .btn{
        width: 120px;
        height: 50px;
        font-weight: 700;
        flex-shrink: 0;
    }
    @include media-breakpoint-down(lg){
        display: block;
        input{
            margin-right: 0;
            margin-bottom: 10px;
        }
        .selects{
            margin-right: 0;
            margin-bottom: 10px;
            select{
                width: 100%;
            }
        }
        .btn{
            width: 100%;
        }
    }
}
</style>
import axios from 'axios'
import _uniqBy from 'lodash/unionBy'

const _defaultMessage = 'Search for the movie title!' 


export default{
    // module
    namespaced: true,
    // State (상태)
    // - 애플리케이션의 전역 상태를 저장하는 곳입니다.
    // - data 속성과 비슷하지만 여러 컴포넌트 간에 공유됩니다.
    state: ()=>({
        movies: [],
        message: _defaultMessage,
        loading: false
    }),
    // Getters (게터) 
    // - State의 일부를 계산한 속성을 제공하는 함수들을 정의합니다.
    // - 계산된 속성(computed properties)과 유사하지만, Vuex에서 사용됩니다.
    getters: {
        // moviesIDs(state){
        //     return state.movies.map(m => m.imdbID)
        // }
    },
    // Mutations (변이)
    // - State를 변경하는 유일한 방법입니다
    // 동기적으로 State를 변경하는 함수들을 정의합니다
    mutations: {
        updateState(state, payload){
            Object.keys(payload).forEach(key=>{
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
          }
    },
    // Actions (액션)
    // - 비동기 작업 및 복잡한 로직을 포함한 작업들을 정의합니다
    // - Mutations을 호출하여 State를 변경합니다
    actions: {
        async searchMovies( { state ,commit },payload){
            if(state.loading)return
            
            commit('updateState',{
                message: '',
                loading: true
            })
            try{
                const res = await _fetchMovies({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = res.data
                commit('updateState',{
                    movies: _uniqBy(Search,'imdbID'),
                    // message: 'Hello World!',
                    // loading: true
                })
                console.log(totalResults) // 325
                console.log(typeof totalResults) // string
            
                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)
    
                // 검색 갯수 추가 요청
                if(pageLength > 1){
                    for( let page = 2; page <= pageLength; page +=1 ){
                        if(page > payload.number / 10){
                            break
                        }
                        const res = await _fetchMovies({
                            ...payload,
                            page
                        })
                        const { Search } = res.data
                        commit('updateState',{
                            movies: [...state.movies,
                                ..._uniqBy(Search,'imdbID')]
                        })
                    }
                }
            }catch({message}){
                commit('updateState',{
                    movies: [],
                    message
                })
            } finally{
                commit('updateState',{
                    loading: false
                })
            }
            
        },
        async searchMovieWithId({ state, commit }, payload) {
            // const { id } = payload
            if (state.loading) return
      
            commit('updateState', {
              theMovie: {},
              loading: true,
            })
      
            try {
              const res = await _fetchMovies(payload)
              commit('updateState', {
                theMovie: res.data
              })
            } catch (error) {
              commit('updateState', {
                theMovie: {}
              })
            } finally {
              commit('updateState', {
                loading: false
              })
            }
          }
    }
}




function _fetchMovies(payload){
    const {title, type, year, page, id } = payload
    const OMDB_API_KEY = '7035c60c'
    const url = id 
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`



    return new Promise((resolve,reject)=>{
        axios.get(url)
            .then( res =>{
                console.log(res)
                if(res.data.Error){
                    reject(res.data.Error)
                }
                resolve(res)
            })
            .catch( err =>{
                reject(err.message)
            })
    })
}

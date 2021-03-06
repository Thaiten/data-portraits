<template>
  <div>
    <h1>Nachrichten Analyse</h1>
    <p>Wir haben 200 Artikel vom 21.12. - 27.12.20 von Focus Online, Spiegel und Deutsche Welle analysiert.<br>
    Das meist-genutzte Wort kam 283 mal vor. <span class="bold">Gib' eine Zahl ein und finde ein Wort mit der Häufigkeit</span></p>
    <input type="number" name="count" id="" v-model.number="count" @keypress.enter="doSearch" @click="playSound">
    <button @click="doSearch">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-focus-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r=".5" fill="currentColor" />
        <circle cx="12" cy="12" r="7" />
        <line x1="12" y1="3" x2="12" y2="5" />
        <line x1="3" y1="12" x2="5" y2="12" />
        <line x1="12" y1="19" x2="12" y2="21" />
        <line x1="19" y1="12" x2="21" y2="12" />
      </svg>
    </button>
    <div v-if="searched" class="wortBox">
      <animation :word="activeWord.term" :class="{animated: animation}"/>
      <p>Das Wort kommt <span class="bold">{{springNumber}}</span> mal vor.</p>
      <a :href="'https://de.wikipedia.org/wiki/'+activeWord.term" target="_blank">Mehr Informationen hierzu auf Wikipedia <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-external-link" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
        <line x1="10" y1="14" x2="20" y2="4" />
        <polyline points="15 4 20 4 20 9" />
      </svg></a>
      <div class="buttons">
        <button @click="prev"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="9" y2="16" />
          <line x1="5" y1="12" x2="9" y2="8" />
        </svg></button>
        <button @click="next"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="15" y1="16" x2="19" y2="12" />
          <line x1="15" y1="8" x2="19" y2="12" />
        </svg></button>
      </div>
    </div>
  </div>
</template>

<script>
import filteredList from '@/assets/filteredList.json'
import animation from "@/components/animation"
import { spring } from 'vue3-spring';

export default {
  name: 'App',
  components: {
    animation
  },
  data(){
    return({
      list: filteredList,
      springNumber: spring(0, {
        precision: 0,
        damping: 50
      }),
      count: 0,
      animation: false,
      searched: false,
      activeWord: {
        term: ""
      },
    })
  },
  methods: {
    playSound(){
      
    },
    doSearch(){
      this.searched = true;
      this.animation = true;

      const exactMatches = this.list.filter(term => term.rawFreq == this.count);

      if(exactMatches.length > 0){
        this.activeWord = exactMatches[this.getRandomInt(exactMatches.length)];
      }else{
        const closestNumber = this.list[this.list.reduce((previous, current, i, array) => {
            return i && Math.abs(array[previous].rawFreq - this.count) < Math.abs(current.rawFreq - this.count) ? previous : i;
        }, -1)].rawFreq;
        let exactMatches = this.list.filter(term => term.rawFreq == closestNumber);
        this.activeWord = exactMatches[this.getRandomInt(exactMatches.length)];
      }

      window.setTimeout(() => {this.animation = false}, 1000)
    },
    prev(){
      const prevElement = this.activeWord;
      if(this.count > 10){
        this.count--;
        this.doSearch();
        if(prevElement == this.activeWord){
          this.prev();
        }else{
          this.count = this.activeWord.rawFreq;
        }
      } else if(this.count > 283){
        this.count = 282;
        this.doSearch();
      }
    },
    next(){
      const prevElement = this.activeWord;
      if(this.count < 283){
        this.count++;
        this.doSearch();
        if(prevElement == this.activeWord){
          this.next();
        }
        else{
          this.count = this.activeWord.rawFreq;
        }
      } else if(this.count < 10){
        this.count = 11;
        this.doSearch();
      }
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  },
  mounted () {
    document.body.classList.add('count')
  },
  unmounted () {
    document.body.classList.remove('count')
  },
  watch: {
    activeWord(newValue) {
      this.springNumber = newValue.rawFreq;
    }
  }
}
</script>

<style>
input{
  padding: 0 1em;
  height: 48px;
  border: none;
  background: none;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), 
                0 2px 4px rgba(0,0,0,0.05), 
                0 4px 8px rgba(0,0,0,0.05), 
                0 8px 16px rgba(0,0,0,0.05),
                0 16px 32px rgba(0,0,0,0.05), 
                0 32px 64px rgba(0,0,0,0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  margin: 0 16px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
button{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 48px;
  width: 48px;
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  vertical-align: bottom;
  padding: 0;
}
button svg{
  height: 32px;
  width: 32px;
  stroke: #91521B;
}

.buttons{
  display: flex;
  justify-content: space-between;
}
.wortBox{
  animation: .5s ease appear;
  height: 165px;
  margin-top: 16px;
}

@keyframes appear {
  0% {
    height: 0px;
    opacity: 0;
  }
}

@media (max-width: 500px) {
  svg.svg-container{
  transform: rotate(90deg) scale(1.8);
  }
}
</style>

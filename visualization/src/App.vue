<template>
  <kinesis-container class="container">
      <background />
	  <home />
    </kinesis-container>
</template>

<script>
import home from "./components/Home.vue";
import background from "./components/background.vue";

export default {
	components: {
		background,
		home
	},
	title: "Data"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;0,900;1,400&display=swap');

body{
    background: #fff;
    transition: .3s ease;
	overflow-x: hidden;
	font-family: 'Montserrat', sans-serif;
	--background: ;
	--elements: #808080;
}
::selection {
    background: #000;
    color: #fff;
}
.element{
	z-index: -1;
	transition: .3s ease color;
}
.count{
	background: #FFF2DC;
	--background: #FFF2DC;
	--elements: #F0A868;
}
.count .element{
	color: #F0A868;
}
.quiz{
	background: #DCF9FF;
	--background: #DCF9FF;
	--elements: #689EF0;
}
.quiz .element{
   color: #689EF0;
}
</style>
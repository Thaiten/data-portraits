<template>
	<div class="animationHolder">
		<template v-for="word in words" :key="word.id">
			<span class="scrollby" :style="`--index: ${word.id};`">{{word.word}}</span>
		</template>
		<span class="finalWord">{{word}}</span>
	</div>
</template>
<script>
export default {
	data() {
		return({
			words: [
				{
					word: "Corona",
					id: 0
				},
				{
					word: "Europa",
					id: 1
				},
				{
					word: "Deutschland",
					id: 2
				},
				{
					word: "Flüchtlinge",
					id: 3
				},
				{
					word: "Autobahn",
					id: 4
				},
				{
					word: "Smartphone",
					id: 5
				},
				{
					word: "Donald Trump",
					id: 6
				},
				{
					word: "Eric Wätke",
					id: 7
				},
				{
					word: "Russland",
					id: 8
				},
				{
					word: "Weihnachten",
					id: 9
				},
			]
		})
	},
	props: [
		"word"
	]
}
</script>
<style lang="css">

.animationHolder{
	height: 50px;
	overflow: hidden;
	position: relative
}

.finalWord{
	font-weight: 600;
    font-size: 24pt;
	left: 0;
	position: absolute;
	text-transform: capitalize;
}
.animationHolder.animated .finalWord{
	animation: flyIn .2s ease-in forwards;
	animation-delay: .4s;
	transform: translateY(50px);
}

.scrollby {
    position: absolute;
    left: 0;
    font-weight: 600;
    font-size: 24pt;
	transform: translateY(50px);
}
.animationHolder.animated .scrollby{
	animation: flyBy .05s linear forwards;
	animation-delay: calc(0.05s * var(--index));
}

@keyframes flyBy {
	from{
		transform: translateY(50px);
	}
	to{
		transform: translateY(-50px);
	}
}
@keyframes flyIn {
	from{
		transform: translateY(50px);
	}
	to{
		transform: translateY(0px);
	}
}

</style>
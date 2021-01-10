<template>
	<div class="wrapper">
		<h1>Schlag&shy;zeilen Ana&shy;lyse</h1>
		<p>Eine Interaktive Reise durch die Schlagzeilen vom Dezember 2020</p>

		<p>von Milan Wulf, Hamed Shahsavari, <strong>Eric Wätke</strong>
		<br>für Data-Portraits - Prof. Myriel Milicevic - WiSe 20/21</p>

		<h2>wait, what?</h2>
		<p>Wir haben vom 21.12.2020 bis zum 28.12.2020 <strong>198 Nachrichtenartikel</strong> vom <em>Spiegel, Focus Online </em>und <em>Deutsche Welle</em> gesammelt.</p>

		<img src="../assets/struktur.svg" alt="">

		<p>Mit diesem, für uns drei, identischem Datensatz, haben wir nun unterschiedliche Visualisierungsformen erstellt.</p>
		<p>Ich wollte den interaktiven Weg gehen, da wir ja auch mit p5.js in dieses Thema viel Zeit gesteckt haben.</p>
		<p>Es war wirklich interessant, die Liste der Wörter zu überfliegen und zu schauen, welche Wörter oft genutzt wurden und dann festzustellen, wie erwartet und wie unerwartet manche auf der Liste sind.</p>
	
		<div class="full-bleed">
			<div class="text">
				<div class="text-wrapper">
					<h2>#word count</h2>
					<p>Und mit Word Count kannst du das gleiche erleben, wie ich, als ich die Liste zum ersten mal sah.</p>
					<p><strong>Gib’ eine Zahl ein und finde ein Wort, welches so oft benutzt wurde!</strong></p>
					<p>Zur Erinnerung: wir haben 198 Artikel analysiert und das meistgenutzte Wort kam 283 mal vor!
					<br>Einige Zahlen behausen natürlich mehrere Wörter, andere gar keins. In dem Fall wird das dichteste Wort angezeigt</p>
				</div>
			</div>
			<kinesis-element strength="15" type="depth" tag="div" class="interactive">
				<WordCount/>
			</kinesis-element>
		</div>

		<p>Cool!
		<br>Vielleicht haben dich auch einige Worte überrascht. Trotzdem hat man noch nicht wirklich ein Gefühl über die Verhältnisse einzelner Worte.</p>

		<p>Und weil jeder schonmal ‘ne Wordcloud gesehen hat, habe ich <strong>keine</strong> gemacht. Also, mehr oder weniger.</p>
		
		<div class="full-bleed">
			<kinesis-element strength="15" type="depth" tag="div" class="interactive">
				<WordOfFame />
			</kinesis-element>
			<dv class="text">
				<div class="text-wrapper">
					<h2>##word of fame</h2>
					<p>Es ist schon bisschen wie eine Wordcloud. Aber nur etwas!</p>
					<p>Suche aus diesen 9 Worten jenes aus, welches deiner Ansicht nach am öftesten benutzt wurde. Du kannst es gerne öfter versuchen, die Wörter werden zufällig ausgesucht.</p>
					<p>Bedenke, der Zeitraum der Artikel liegt zwischen dem 21.12. und dem 28.12.2020</p>
				</div>
			</dv>
		</div>

		<p>Eyeopening 😮</p>
		<p>Übrigens: nur 10% aller Antworten die hier jemals gegeben worden, sind richtig.</p>
		
		<video src="../assets/clarkson.mp4" autoplay muted loop poster="../assets/clarkson_thumb.png"></video>

		<p>Alles was wir bis jetzt ausprobiert haben hat sich ausschließlich mit der Wortanzahl von allen Artikeln beschäftigt.</p>
		<p>Deshalb nutze ich die Gelegenheit, und mache als letzte Interaktion etwas anders.</p>

		<div class="full-bleed">
			<div class="text">
				<div class="text-wrapper">
					<h2>###work in progress</h2>
					<p>Geplant ist ein Quiz, bei welchem man die Publikationsstelle bei welcher man denkt, sie hat das Wort am öftesten benutzt, auswählt.</p>
					<p>ToDo:</p>
					<ul>
						<li>Drittes Quiz</li>
						<li>Background Change on Scroll Waypoints</li>
					</ul>
				</div>
			</div>
			<div class="interactive">

			</div>
		</div>

		<p>So, das war alles! 
		<br>Hoffentlich hattest du beim ausprobieren genau so viel Spaß wie ich beim erstellen der interaktiven Demos!</p>

		<p>Die Visualisierungen von Milan und Hamed findest du in unserer <a href="https://fhp.incom.org/workspace/9028" target="_blank" rel="nofollow">Incom Dokumentation.</a></p>

		<p>Falls du dir die gesammelten Daten anschauen möchtest, findest du diese in unserem <a href="https://github.com/ericwaetke/data-portraits" target="_blank" rel="nofollow">GitHub Repository.</a></p>

		<p>Bye Bye und bis bald! 🎉</p>

		<div class="spacer"></div>
	</div>
</template>

<script>
import WordCount from "./wordcount/WordCount.vue"
import WordOfFame from "./wordoffame/WordOfFame.vue"

export default {
	name: "Home",
	components: {
		WordCount,
		WordOfFame
	}
}
</script>

<style lang="scss">
.wrapper {
	display: grid;
	grid-template-columns: 1fr min(65ch, 100%) 1fr;
}
.wrapper > * {
	grid-column: 2;
}
.full-bleed {
	margin: 15% 0;
	width: 100%;
	grid-column: 1 / 4;
	display: grid;
	grid-template-columns: 1fr 1fr;

	.text, .interactive{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.text{
		.text-wrapper{
			width: min(65ch, 100%);
		}
	}
	.interactive{
		.buttons{
			margin-top: 1em;
		}
	}
}

h1{
	font-weight: 900;
	font-size: 72pt;
}
h2{
	font-weight: 900;
	font-size: 48pt;
}

img{
	width: 100%;
}

video {
    width: 100%;
    margin: 5em 0;
	border-radius: 15px;
}

a{
	position: relative;
	box-shadow: inset 0 -.4rem 0 0 var(--elements);
	transition:box-shadow .4s cubic-bezier(.18,.89,.32,1.28);
	color: #000;
	text-decoration: none;
	&:hover{
		box-shadow:inset 0 -.75rem 0 0 var(--elements)
	}
}

.spacer{
	height: 25vh;
}

@media only screen and (max-width: 768px){
	.wrapper{
		padding: 0 2em;

		.text{
			grid-row: 1;
		}
		.interactive{
			margin-top: 2em;
			grid-row: 2;
		}
		.text, .interactive{
			grid-column: 1/3;
		}
	}
}
@media only screen and (max-width: 500px){
	.wrapper{
		h1{
			font-size: 48pt;
		}
		h2{
			font-size: 32pt;
		}
	}
}
@media only screen and (max-width: 350px){
	.wrapper{
		h1{
			font-size: 32pt;
		}
		h2{
			font-size: 24pt;
		}
	}
}
</style>
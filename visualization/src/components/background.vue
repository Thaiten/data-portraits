<template>
  <div class="svg-wrapper">
    	<svg class="svg-container" viewBox="0 0 1410 1002" fill="none" xmlns="http://www.w3.org/2000/svg">
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <circle cx="180.5" cy="636.5" r="110.5" fill="currentColor" :fill-opacity="opacity[3]"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <circle cx="1224" cy="263" r="79" fill="currentColor" :fill-opacity="opacity[4]"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <circle cx="1056.5" cy="891.5" r="93.5" stroke="currentColor" :stroke-opacity="opacity[0]" stroke-width="34"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <path d="M761.486 654.209C780.532 683.327 819.577 691.492 848.695 672.446L779.723 567C750.605 586.046 742.44 625.091 761.486 654.209Z" fill="currentColor" :fill-opacity="opacity[1]"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <path d="M80.2118 206.06C56.0152 231.063 56.6689 270.947 81.6719 295.144L169.295 204.6C144.292 180.403 104.408 181.057 80.2118 206.06Z" fill="currentColor" :fill-opacity="opacity[2]"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <path d="M401.405 188.288L438.249 294.672L327.695 273.388L401.405 188.288Z" fill="currentColor" :fill-opacity="opacity[3]"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <path d="M1286.42 502.538C1289.43 489.802 1305.1 485.098 1314.62 494.072L1437.86 610.17C1447.39 619.143 1443.63 635.063 1431.09 638.826L1268.93 687.507C1256.4 691.27 1244.49 680.053 1247.5 667.317L1286.42 502.538Z" fill="currentColor" fill-opacity="0.2"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <rect x="492.208" y="715.462" width="29" height="190" transform="rotate(-15.5789 492.208 715.462)" fill="currentColor" :fill-opacity="opacity[4]"/>
      </kinesis-element>
      <kinesis-element class="element" :strength="randomStrength()" type="translate" tag="g">
        <rect x="832.505" y="134.506" width="59.1662" height="190" transform="rotate(12.5264 832.505 134.506)" fill="currentColor" :fill-opacity="opacity[0]"/>
      </kinesis-element>
    </svg>
  </div>
</template>

<script>
export default {
  name: "background",
  props: {
    mobile: Boolean
  },
  setup() {
    function randomStrength(){
			if(this.mobile){
				return 0;
			}else {
				return Math.floor(Math.random() * 100);
			}
    }
    const maxOpacity = .2;
    const opacity = [Math.random()*maxOpacity, Math.random()*maxOpacity, Math.random()*maxOpacity, Math.random()*maxOpacity, Math.random()*maxOpacity]
    
    return{
      randomStrength, opacity
    }
  },
}
</script>

<style lang="scss">
.svg-wrapper{
  position: sticky;
  top: 0;
  z-index: -5;
  height: 100vh;
  width: 100vw;
  margin-bottom: -100vh;
  overflow: hidden;

  .svg-container {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
class ClapDetectProcessor extends AudioWorkletProcessor {
    constructor() {
        super()
        this.lastClap = currentTime;
    }

    process (inputs, outputs, parameters) {
    
      if (this.lastClap + 0.100 > currentTime) {
          return true;
      }

      const input = inputs[0];
      const channel = input[0];

      let zeroCrossings = 0;
      let highAmp = 0;
      for (let i = 1; i < channel.length; i++) {
          if (Math.abs(channel[i]) > 0.25) { // TWEAK HERE
              highAmp++; 
          }
          if (
            (channel[i] > 0 && channel[i - 1] < 0) ||
            (channel[i] < 0 && channel[i - 1] > 0)
          ) {
            zeroCrossings++;
          }
      }

      if (highAmp > 20 && zeroCrossings > 30) {
          // TWEAK HERE
          console.log(`${highAmp} / ${zeroCrossings}`, currentTime - this.lastClap);
          this.lastClap = currentTime;
      }

      return true
    }
  }
  
  registerProcessor('clap-detect-processor', ClapDetectProcessor)
  
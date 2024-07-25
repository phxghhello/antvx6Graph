<template>
  <div>
    <span v-for="(word, index) in text" :key="index" class="word-item" :class="[textActive[index] ? 'active': '']">{{ word }}</span>
  </div>
</template>

<script>
import Speech from "speak-tts";
export default {
    data() {
        return {
            text: "94号指令未委托",
            textActive: []
        }
    },
  mounted() {
    const speech = new Speech(); // will throw an exception if not browser supported
    if (speech.hasBrowserSupport()) {
      // returns a boolean
      console.log("speech synthesis 支持");
    }

    speech
      .init({
        lang: "zh-CN",
      })
      .then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);

        const text = this.text
        speech
          .speak({
            text: text,
            listeners: {
              onstart: () => {
                console.log("开始");
              },
              onend: () => {
                console.log("结束");
              },
              onresume: () => {
                console.log("暂停");
              },
              onboundary: (event) => {
                console.log(event);
                const num = event.charIndex + event.charLength
                for(let i = 0;i < text.length;i++) {
                    if (i <= num) {
                        this.textActive[i] = true
                    }
                }
                console.log(event.charIndex, event.charLength);
                console.log(
                  event.name +
                    " boundary reached after " +
                    event.elapsedTime +
                    " 毫秒."
                );
              },
            },
          })
          .then(() => {
            console.log("已成功 !");
            // setTimeout(() => {
                this.textActive = []
            // }, 10);
          })
          .catch((e) => {
            console.error("An error occurred :", e);
          });
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });
  },
};
</script>

<style>
.word-item.active {
    color: aquamarine;
    font-weight: bold;
}
</style>

<template>
  <div id="input_command">
    <div id="console_input">
      <span v-text="userPath" class="user-path" />:<span
        class="directory-path"
        v-text="directoryPath"
      />
      <span v-text="command"></span><span id="console_cursor">_</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["directoryPath", "userPath"],
  data() {
    return {
      command: "",
      lastCommands: [],
      currentIndex: 0,
    };
  },
  methods: {
    clearText() {
      this.command = "";
    },
    getCurrentCommandText() {
      return this.command;
    },
    sendCommand() {
      this.$emit("executeCommand", this.getCurrentCommandText());
    },
    inputChange(e) {
      this.goDown();
      if (e.key.length == 1) {
        this.keyLetter(e);
      } else if (this.command.length >= 0 && e.keyCode == 8) {
        this.keyRemove();
      } else if (e.keyCode == 13) {
        this.keyEnter();
      } else if (e.keyCode == 40) {
        this.keyDown();
      } else if (e.keyCode == 38) {
        this.keyUp();
      }
    },
    keyDown() {
      this.clearText();
      if (this.currentIndex + 1 < this.lastCommands.length) {
        this.currentIndex += 1;
        this.command += this.lastCommands[this.currentIndex];
      } else {
        this.currentIndex = this.lastCommands.length;
      }
    },
    keyUp() {
      this.clearText();
      if (this.currentIndex != 0) {
        this.currentIndex -= 1;
      }
      this.command += this.lastCommands[this.currentIndex];
    },
    keyEnter() {
      this.lastCommands.push(this.getCurrentCommandText());
      this.currentIndex = this.lastCommands.length;
      this.sendCommand();
      this.clearText();
    },
    keyRemove() {
      this.command = this.command.slice(0, -1);
    },
    keyLetter(e) {
      this.command += e.key;
    },
    goDown() {
      document
        .getElementById("console")
        .scrollTo(
          0,
          document.getElementById("console").scrollHeight ||
            document.documentElement.scrollHeight
        );
    },
  },
  computed: {
    fullPath: function () {
      return this.userPath + ":" + this.directoryPath;
    },
  },
  mounted() {
    document.addEventListener("keydown", this.inputChange, false);
    document.addEventListener("keyup", this.goDown, false);
    this.clearText();
  },
};
</script>

<style>
#input_command {
  display: flex;
  justify-items: flex-start;
  flex-direction: column;
}

#console_cursor {
  font-weight: bold;
  color: #ababab;
  background-color: #ababab;
  -webkit-animation: cursor_blinker 1.2s infinite;
  -ms-animation: cursor_blinker 1.2s infinite;
  animation: cursor_blinker 1.2s infinite;
  -webkitanimation-timing-function: linear;
}

#console_input {
  left: 0;
  color: white;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: left;
}

@-webkit-keyframes cursor_blinker {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes cursor_blinker {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes cursor_blinker {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.user-path {
  color: #85db34;
}

.directory-path {
  color: #709dce;
}

/* SMARTPHONES PORTRAIT */
@media only screen and (min-width: 300px) {
  #input_command {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

/* SMARTPHONES LANDSCAPE */
@media only screen and (min-width: 480px) {
}

/* TABLETS PORTRAIT */
@media only screen and (min-width: 768px) {
  #input_command {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

/* TABLET LANDSCAPE / DESKTOP */
@media only screen and (min-width: 1024px) {
}
</style>
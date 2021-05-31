<template>
  <div class="main">
    <item-command ref="itemCommand" v-bind:outputs="outputs" />
    <span ref="loading" class="loading" v-bind="loading.text"></span>
    <item-enter-command
      v-if="loading.state == false"
      ref="itemEnterCommand"
      v-bind:userPath="userPath"
      v-bind:directoryPath="directoryPath"
      @executeCommand="executeCommand"
    />
  </div>
</template>

<script>
import ItemEnterCommand from "./ItemEnterCommand.vue";
import data from "../static/commands.json";
import consoleSettings from "../static/console.json"
import splash from '!!raw-loader!../static/splash.html';
import {
  execute,
  executableCommands,
  back,
  invalidOperandCommands,
  missingOperandCommands,
} from "../store/console/index";
import ItemCommand from "./ItemCommand.vue";

export default {
  data() {
    return {
      userPath: "user@gaan",
      directoryPath: "~$",
      command: "",
      outputs: [],
      child: data,
      loading: {
        state: false,
        count: 0,
      },
      consoleSettings: consoleSettings
    };
  },
  components: {
    ItemEnterCommand,
    ItemCommand,
  },
  methods: {
    executeCommand(com) {
      this.printResponse([this.getFullPath, com]);
      this.checkLoggedUserCommand(com);
    },
    checkLoggedUserCommand(com) {
      var args = com.split(" ");
      var out = [];
      if (args[0] == "back") {
        //navgiate back command
        if (args.length > 1) {
          out = invalidOperandCommands(args.join(" "));
          this.outputs.push(out);
          return;
        }
        out = back(this.child);
        if (typeof out === "string") {
          this.outputs.push(out);
        } else {
          this.child = out;
          this.directoryPath =
            this.directoryPath.split("/").slice(0, -1).join("/") + "$";
        }
      } else if (args[0] == "go") {
        //navgiate next page command
        if (args.length == 1) {
          out = missingOperandCommands(com);
          this.outputs.push(out);
          return;
        } else if (args.length > 2) {
          out = invalidOperandCommands(com);
          this.outputs.push(out);
          return;
        }
        out = execute(this.child, args);
        if (typeof out === "string") {
          this.outputs.push(out);
        } else {
          this.child = out;
          this.directoryPath =
            this.directoryPath.slice(0, -1) + "/" + out.command + "$";
          this.printResponse([this.getFullPath, " ", out.output]);
        }
      } else if (args[0] == "help") {
        //Help command
        this.printResponse([executableCommands(this.child)]);
      } else if (args[0] == "clear" || args[0] == "cls" || args[0] == "clr") {
        //Clear command
        this.outputs = [];
        this.outputs.push(splash)
      } else if (com === null || com.match(/^ *$/) !== null) {
        return;
      }
      else {
        //If command not found
        out = execute(this.child, args);
        this.printResponse([out]);
      }
    },
    checkUnLoggedUserCommand(com) {
      console.log(com);
    },
    printResponse(response) {
      response = response.join("");
      this.outputs.push(response);
    },
    // startAnimation() {
    //   this.loading.state = true;
    //   for (var i = 0; i < 100; i++, this.loading.count++) {
    //     this.$refs.loading.innerHtml = this.getLoadingHtml;
    //     console.log(this.loading.count);
    //     this.delay(50);
    //   }
    //   this.loading.state = false;
    //   this.loading.count = 0;
    // },
    // delay(ms) {
    //   setTimeout(() => {}, ms);
    // },
  },
  computed: {
    getFullPath() {
      var outHtml = `<span style="color: #85DB34;">${this.userPath}:</span>`;
      outHtml += `<span style="color: #709DCE;">${this.directoryPath}</span>`;
      return outHtml;
    },
    // getLoadingHtml() {
    //   var response = `Progress: [ ${this.loading.count}%] [`;
    //   for (var i = 0; i < 100; i++) {
    //     if (i < this.loading.count) {
    //       response += "#";
    //     } else {
    //       response += ".";
    //     }
    //   }
    //   response += "]";
    //   return response;
    // },
  },
  mounted() {
    this.outputs.push(splash)
    this.outputs.push(executableCommands(this.child) + "<br><br>")
  },
};
</script>

<style scoped>
.main {
  margin-top: 6px;
  margin-left: 6px;
}

.itemEnterCommand {
  display: flex;
  flex-direction: column;
  background-color: white;
}
/* 
.loading {
  width: 100vw;
  height: 100px;
  background-color: black;
} */

::-webkit-scrollbar {
  width: 1rem;
}

::-webkit-scrollbar-thumb {
  background: #ea7445;
  border-radius: 50vmax;
  border: 4px solid #300a24;
}

::-webkit-scrollbar-track {
  background: #300a24;
}


</style>
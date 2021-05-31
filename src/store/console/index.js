function execute (child, commandArgs) {
  var out = {}
  var element = child.commands.find(element => element.command === commandArgs[1])
  if (element != undefined && element['command']) {
    out.output = element.output + "<br><br>"
    out.commands = element.commands
    out.command = element.command
    out.base = child
    return out
  } else {
    return `${commandArgs.join(" ")}: command not found. Try to write "help" and press enter`
  }
}

function back (element) {
    if(element['base'])
        return element.base
    return `${element.command} is base, there is not exists above this path` 
}

function executableCommands (child) {
  var list = []
  list.push("<br>&nbsp;&nbsp;&nbsp;PAGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DESCRIPTION")
  child.commands.forEach(element => {
    list.push("<br>&nbsp;&nbsp;&nbsp;" + element.command + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (element.description != undefined ? element.description : ""))
  })
  var outHtml = `Welcome to our Devs' page. In this website does not exist UI, you have to find data by <span style="color:#72A113;">commands</span><br>`
  outHtml += `You can enter pages by command '<span style="color:#72A113;">go page-name</span>' which under has mentioned<br>`
  outHtml += `Or you can try to write command '<span style="color:#72A113;">back</span>' to go to path of previous page`
  outHtml += `'<span style="color:#72A113;">clear'/'cls'/'clr</span>' commands use for cleaning the terminal<br>`
  outHtml += list.join("")
  outHtml += "<br><br>Example: write 'go home' and press enter, or write 'help' and press enter"
  return outHtml
}

function invalidOperandCommands (command) {
  return `${command}: invalid operand`
}

function missingOperandCommands (command) {
  return `${command}: missing operand`
}

export { execute, executableCommands, back, invalidOperandCommands, missingOperandCommands}

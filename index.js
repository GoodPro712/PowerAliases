const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
const Settings = require("./components/settings");
module.exports = class PowerAliases extends Plugin {
  async startPlugin() {
    this.loadStylesheet("./style.scss");
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: "PowerAliases",
      render: Settings,
    });

    var messageEvents = await getModule(["sendMessage"]);
    var aliases = this.settings.get("aliases", []);
    console.log(aliases);
    inject(
      "powerAliases-Chat",
      messageEvents,
      "sendMessage",
      function (args) {
        var text = args[1].content;
        for (var alias of aliases) {
          var reg = new RegExp(`${alias.alias}\\b`, "i");
          console.log(reg.test(text));
          text = text.replace(reg, alias.new);
        }
        console.log(text);
        args[1].content = text;
        return args;
      },
      true
    );
  }
  // var key = _this.settings.get("keybind", "F5");
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
    uninject("powerAliases-Chat");
  }
};

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
    inject(
      "powerAliases-Chat",
      messageEvents,
      "sendMessage",
      (args) => {
        var aliases = this.settings.get("aliases", []);
        var text = args[1].content;
        for (var alias of aliases) {
          var reg = new RegExp(`${alias.alias}`, "gi");
          text = text.replace(reg, alias.new);
        }
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

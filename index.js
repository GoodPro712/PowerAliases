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
    // var editEvents = await getModule(["editMessage"]);
    inject(
      "powerAliases-Messages",
      messageEvents,
      "sendMessage",
      (args) => {
        var aliases = this.settings.get("aliases", []);
        var text = args[1].content;
        if (this.settings.get("enabled", true)) {
          for (var alias of aliases) {
            var reg = new RegExp(`\\b${alias.alias}\\b`, "gi");
            text = text.replace(reg, alias.new);
          }
          args[1].content = text;
        }
        return args;
      },
      true
    );
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
    uninject("powerAliases-Messages");
  }
};

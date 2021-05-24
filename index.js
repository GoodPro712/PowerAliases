const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require('powercord/injector');
const Settings = require("./components/settings");
module.exports = class PowerAliases extends Plugin {
  async startPlugin() {
    this.loadStylesheet("./style.scss");
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: "PowerAliases",
      render: Settings,
    });

    var messageEvents = getModule(["sendMessage"]);

    inject(
      "PowerAliases-Chat",
      messageEvents,
      "sendMessage",
      function (args) {
        const text = args[1].content;

        console.log(text);
        args[1].content = text;
        return args;
      },
      true
    );
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
    uninject("PowerAliases-Chat");
  }
};

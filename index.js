const { Plugin } = require("powercord/entities");
const Settings = require("./components/settings");
module.exports = class PowerAliases extends Plugin {
  async startPlugin() {
    this.loadStylesheet("./style.scss");
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: "PowerAliases",
      render: Settings,
    });
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
  }
};

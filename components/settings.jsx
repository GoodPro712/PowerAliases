const {
  React,
  getModuleByDisplayName,
  getModule,
} = require("powercord/webpack");
const { FormTitle } = require("powercord/components");
const {
  SwitchItem,
  RadioGroup,
  TextInput,
  ButtonItem,
} = require("powercord/components/settings");
const { Close } = require("powercord/components/Icons");
const AsyncComponent = require("powercord/components/AsyncComponent");
const TextArea = AsyncComponent.from(getModuleByDisplayName("TextArea"));
const Dispatch = getModule(["ComponentDispatch"], false);
module.exports = class Panikk extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // example aliases [{alias: "fuck", new: "🦆"}]
      aliases: props.getSetting("aliases", []),
      enabled: props.getSetting("enabled", true),
    };
  }

  render() {
    const { updateSetting, getSetting } = this.props;
    return (
      <>
        <SwitchItem
          note="Enable PowerAliases"
          value={this.state.enabled}
          onChange={() => {
            this.setState({ enabled: !this.state.enabled });
            this.props.toggleSetting("enabled");
          }}
        >
          Enable
        </SwitchItem>
        <FormTitle>Current Aliases</FormTitle>
        {this.state.aliases.map((data) => {
          return (
            <div className="GridArea-PA">
              <div classNae="AliasArea-PA1">
                <TextArea
                  className="TextArea-PA"
                  id={`TextArea-1-${data.alias}-${data.new}`}
                  value={data.alias}
                ></TextArea>
              </div>
              <div className="AliasArea-PA2">
                <TextArea
                  className="TextArea-PA"
                  id={`TextArea-2-${data.alias}-${data.new}`}
                  value={data.new}
                ></TextArea>
              </div>
              <div>
                <Close
                  fill="72767d"
                  className="RemoveBtn-PA"
                  aria-label="Close-PA"
                  onClick={() => {
                    var aliasName = document.getElementById(
                      `TextArea-1-${data.alias}-${data.new}`
                    ).value;
                    var aliasNewName = document.getElementById(
                      `TextArea-2-${data.alias}-${data.new}`
                    ).value;
                    updateSetting(
                      "aliases",
                      this.state.aliases.filter((f) => f.alias !== aliasName)
                    );
                    this.setState({
                      aliases: this.state.aliases.filter(
                        (f) => f.alias !== aliasName
                      ),
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
        <FormTitle style={{ marginTop: "20px" }}>Add New Alias</FormTitle>
        <div className="GridArea-PA">
          <div classNae="AliasArea-PA1">
            <TextArea className="TextArea-PA" id="newAliasText1"></TextArea>
          </div>
          <div className="AliasArea-PA2">
            <TextArea className="TextArea-PA" id="newAliasText2"></TextArea>
          </div>
          <div>
            <ButtonItem
              button="Add Alias"
              tooltipText="Add a new alias"
              onClick={() => {
                var aliasName = document.getElementById("newAliasText1");
                var aliasNew = document.getElementById("newAliasText2");
                if (
                  this.state.aliases
                    .map((a) => a.alias)
                    .includes(aliasName.value) ||
                  aliasName.value === "" ||
                  aliasName.value === " "
                ) {
                  require("powercord/webpack")
                    .getModule(["ComponentDispatch"], false)
                    .ComponentDispatch.dispatch("SHAKE_APP", {
                      duration: 750,
                      intensity: 2,
                    });
                } else {
                  updateSetting("aliases", [
                    ...this.state.aliases,
                    { alias: aliasName.value, new: aliasNew.value },
                  ]);
                  this.setState({
                    aliases: [
                      ...this.state.aliases,
                      { alias: aliasName.value, new: aliasNew.value },
                    ],
                  });
                }
                aliasName.value = "";
                aliasNew.value = "";
              }}
              style={{ borderBottom: "none" }}
            />
          </div>
        </div>
      </>
    );
  }
};

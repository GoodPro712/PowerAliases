const { React, getModuleByDisplayName } = require("powercord/webpack");
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
module.exports = class Panikk extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // example aliases [{alias: "fuck", new: "🦆"}]
      aliases: props.getSetting("aliases", []),
    };
  }

  render() {
    const { updateSetting, getSetting } = this.props;
    return (
      <>
        <FormTitle>Current Aliases</FormTitle>
        {this.state.aliases.map((data) => (
          <div className="GridArea-PA">
            <div classNae="AliasArea-PA1">
              <TextArea
                className="TextArea-PA"
                placeholder={data.alias}
              ></TextArea>
            </div>
            <div className="AliasArea-PA2">
              <TextArea
                className="TextArea-PA"
                placeholder={data.new}
              ></TextArea>
            </div>
            <div>
              <Close
                fill="72767d"
                className="RemoveBtn-PA"
                aria-label="Close"
              />
            </div>
          </div>
        ))}
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
              }}
              style={{ borderBottom: "none" }}
            />
          </div>
        </div>
      </>
    );
  }
};

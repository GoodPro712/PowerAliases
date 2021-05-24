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
    };
  }

  render() {
    const { updateSetting, getSetting } = this.props;
    return (
      <>
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
                    /*

                    This does not work, if somebody wants to make it work feel free, it just handles deletions

                    */
                    console.log(
                      "This does not work, if somebody wants to make it work feel free"
                    );
                    // var aliasName = document.getElementById(
                    //   `TextArea-1-${data.alias}-${data.new}`
                    // );
                    // var aliasNew = document.getElementById(
                    //   `TextArea-2-${data.alias}-${data.new}`
                    // );
                    // console.log({
                    //   alias: aliasName.value,
                    //   new: aliasNew.value,
                    // });
                    // var newArr = this.state.aliases.filter(
                    //   (f) =>
                    //     f.alias === aliasName.value && f.new === aliasNew.value
                    // );
                    // console.log("Old Arr:", this.state.aliases);
                    // console.log("New Arr:", newArr);
                    // this.setState({ aliases: newArr });
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
                    .includes(aliasName.value)
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
              }}
              style={{ borderBottom: "none" }}
            />
          </div>
        </div>
      </>
    );
  }
};

const radioBillAddButton = document.querySelector(".radioBilladdButton");
const callTotalSettingsElem = document.querySelector(".callTotalSettings");
const smsTotalSettingsElem = document.querySelector(".smsTotalSettings");
const totalSettingsElem = document.querySelector(".totalSettings");
const callCostSettingElem = document.querySelector(".callCostSetting");
const smsCostSettingElem = document.querySelector(".smsCostSetting");
const warningLevelSettingElem = document.querySelector(".warningLevelSetting");
const criticalLevelSettingElem = document.querySelector(".criticalLevelSetting");
const updateSettingsElem = document.querySelector(".updateSettings");


var billWithSettings = BillWithSettings()

function settingsUpdate(){

    billWithSettings.setCallCost(Number(callCostSettingElem.value));
    billWithSettings.setSmsCost(Number(smsCostSettingElem.value));
    billWithSettings.setWarningLevel(Number(warningLevelSettingElem.value));
    billWithSettings.setCriticalLevel (Number(criticalLevelSettingElem.value));

    settingsStyleColor();

}

function totalSettings(){
   
      var checkedRadioBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
      if (checkedRadioBtn){
          var billItemType = checkedRadioBtn.value

          
              billWithSettings.grandTotal(billItemType)
          

callTotalSettingsElem.innerHTML = billWithSettings.getTotalCallCost().toFixed(2);
smsTotalSettingsElem.innerHTML =billWithSettings.getTotalSmsCost().toFixed(2);


totalSettingsElem.innerHTML = billWithSettings.getTotalCost().toFixed(2);

settingsStyleColor();
      }
   
}

function settingsStyleColor(){
    totalSettingsElem.classList.remove("danger");
    totalSettingsElem.classList.remove("warning");

    totalSettingsElem.classList.add(billWithSettings.totalClassName());
    
}
radioBillAddButton.addEventListener("click", totalSettings);
updateSettingsElem.addEventListener("click", settingsUpdate);
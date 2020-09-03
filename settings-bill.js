module.exports = function BillWithSettings() {
    var theCallCost;
    var theSmsCost;
    var theCriticalLevel;
    var theWarningLevel;

    var callCostTotal = 0;
    var smsCostTotal = 0;

    let actionList = [];

    function setSettings(settings) {
        theSmsCost = Number(settings.smsCost);
        theCallCost = Number(settings.callCost);
        theCriticalLevel = settings.criticalLevel;
        theWarningLevel = settings.warningLevel;
    }

    function getSettings() {
        return {
            theSmsCost,
            theCallCost,
            theWarningLevel,
            theCriticalLevel

        }

    }


    function setCallCost(callCost) {
        theCallCost = callCost;

    }

    function getCallCost() {
        return theCallCost;
    }



    function setSmsCost(smsCost) {
        theSmsCost = smsCost;

    }

    function getSmsCost() {
        return theSmsCost;
    }

    function recordAction(action) {
        if(!hasReachedCriticalLevel()){
        
        

        let cost = 0;
        if (action === 'sms') {
            cost = theSmsCost;
        }
        else if (action === 'call') {
            cost = theCallCost;
        }

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()

        });
    }
    }
    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }

    function getTotal(type) {
        let total = 0;
        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;


    }


    function grandTotal() {
        return getTotal('sms') + getTotal('call');
    }

    function totals() {
        let smsTotal = getTotal('sms').toFixed(2)
        let callTotal = getTotal('call').toFixed(2)
        let grand = grandTotal().toFixed(2)
        return {
            smsTotal,
            callTotal,
            grand,
            color: totalClassName()
        }
    }

    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = criticalLevel;
    }

    function getCriticalLevel() {
        return theCriticalLevel;
    }

    function setWarningLevel(warningLevel) {
        theWarningLevel = warningLevel;
    }

    function getWarningLevel() {
        return theWarningLevel;
    }

    function makeCall() {
        if (!hasReachedCriticalLevel()) {
            callCostTotal += theCallCost;
        }
    }

    function getTotalCost() {
        return callCostTotal + smsCostTotal;
    }

    function getTotalCallCost() {
        return callCostTotal;
    }

    // function grandTotal(itemType) {
    //     if (itemType === "call") {
    //         makeCall()
    //     }
    //     if (itemType === "sms") {
    //         sendSms()
    //     }
    // }

    function getTotalSmsCost() {
        return smsCostTotal;
    }

    function sendSms() {

        if (!hasReachedCriticalLevel()) {
            smsCostTotal += theSmsCost;
        }
    }

    function hasReachedWarningLevel() {
        const total = grandTotal();
        const reachedWarningLevel = total >= theWarningLevel && total < theCriticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        const total = grandTotal()
        return total >= theCriticalLevel;
    }

    function totalClassName() {

        if (hasReachedCriticalLevel()) {
            return "danger"
        }


        else if (hasReachedWarningLevel()) {
            return "warning"
        }

    }
    return {
        grandTotal,
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setCriticalLevel,
        getCriticalLevel,
        setWarningLevel,
        getWarningLevel,
        makeCall,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        sendSms,
        actions,
        actionsFor,
        totals,
        setSettings,
        getSettings,
        recordAction,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        totalClassName

    }
}


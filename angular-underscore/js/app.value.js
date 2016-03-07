(function(){

  angular.module('app.value',[])
          .value('OrderJson',function(){
              var self = this;

              self.topology = {
              	"topologyId": "1098",
              	"referenceId": "R60012QAX",
              	"offerKey": "Optical_Connect_Agile_GBP",
              	"customerDetails": {
              		"customerId": "",
              		"billingAccountID": "",
              		"btAccountId": "",
              		"role": "User/Admin",
              		"costUnit": "GBP"
              	},
              	"dcs": [{
              		"id": "TLG",
              		"name": "Telecity Global",
              		"dcType": "Standard DC",
              		"pos": {
              			"x": 100,
              			"y": 200
              		},
              		"connecteddcs": ["TLG"],
              		"address": "",
              		"configuration": {
              			"vtns": []
              		}
              	}, {
              		"id": "LHC",
              		"name": "London Hosting Center",
              		"dcType": "Standard DC",
              		"pos": {
              			"x": 500,
              			"y": 400
              		},
              		"address": "",
              		"configuration": {
              			"vtns": []
              		}
              	}],
              	"segments": [{
              		"segmentId": "SEG-TELECITY-TO-LHC",
              		"dc1": 1,
              		"dc2": 2,
              		"vtbs": [{
              			"vtbId": "VTB1",
              			"vtbAlias": "VTB1",
              			"offerID": "32313455",
              			"draft": true,
              			"port1": {
              				"portId": "port001",
              				"offerID": "323132456",
              				"portAlias": "newPortAlias1",
              				"portType": "8GFC",
              				"portDuration": "0_Y|3_M|0_D",
              				"portCost": 200.50,
              				"assigned": true,
              				"draft": true
              			},
              			"port2": {
              				"portId": "port002",
              				"offerID": "323132457",
              				"portAlias": "newPortAlias",
              				"portType": "8GFC",
              				"portDuration": "0_Y|3_M|0_D",
              				"portCost": 200.50,
              				"assigned": true,
              				"draft": true
              			},
              			"bandwidthDuration": "3 Months",
              			"flexibilityProfile": {
              				"flexProfileType": "Static/Flexible",
              				"flexProfileCalendar": {
              					"startDate": "2014-01-01",
              					"startTime": "10:00",
              					"endDate": "2014-01-01",
              					"endTime": "10:00",
              					"recurrence": "daily/weekly/monthly/yearly",
              					"occurrences": "3",
              					"hasEndDate": false
              				}
              			},
              			"protection": "Unprotected / 1+1 / Client",
              			"diversity": {
              				"enabled": false,
              				"diverseFromPath": "VTB003"
              			},
              			"latency": {
              				"latencyValue": "2ms",
              				"ull": true,
              				"routeId": "VPNSEGMENT-1440666242762-1F408E"
              			},
              			"contractTerm": "Auto Renewal/Cease",
              			"ceaseTerm": {
              				"startDate": "2014-02-02",
              				"endDate": "204-03-02",
              				"option": "None/1 day/2 days/1 Week/ 2 Weeks"
              			},
              			"vtbCost": 1200.00,
              			"bandwidthCost": 800
              		}],
              		"StandbyPorts": [{
              			"portId": null,
              			"portAlias": "port31LHC",
              			"portType": "10GFC",
              			"dcid": 1,
              			"assigned": false,
              			"draft": true
              		}, {
              			"portId": null,
              			"portAlias": "port31LHC",
              			"portType": "10GFC",
              			"dcid": 2,
              			"assigned": false,
              			"draft": true
              		}]
              	},
                {
              		"segmentId": "SEG-NYSE-TO-LHC",
              		"dc1": 1,
              		"dc2": 2,
              		"vtbs": [{
              			"vtbId": "VTB1",
              			"vtbAlias": "VTB1",
              			"offerID": "32313455",
              			"draft": true,
              			"port1": {
              				"portId": "port001",
              				"offerID": "323132456",
              				"portAlias": "newPortAlias1",
              				"portType": "8GFC",
              				"portDuration": "0_Y|3_M|0_D",
              				"portCost": 200.50,
              				"assigned": true,
              				"draft": true
              			},
              			"port2": {
              				"portId": "port002",
              				"offerID": "323132457",
              				"portAlias": "newPortAlias",
              				"portType": "8GFC",
              				"portDuration": "0_Y|3_M|0_D",
              				"portCost": 200.50,
              				"assigned": true,
              				"draft": true
              			},
              			"bandwidthDuration": "3 Months",
              			"flexibilityProfile": {
              				"flexProfileType": "Static/Flexible",
              				"flexProfileCalendar": {
              					"startDate": "2014-01-01",
              					"startTime": "10:00",
              					"endDate": "2014-01-01",
              					"endTime": "10:00",
              					"recurrence": "daily/weekly/monthly/yearly",
              					"occurrences": "3",
              					"hasEndDate": false
              				}
              			},
              			"protection": "Unprotected / 1+1 / Client",
              			"diversity": {
              				"enabled": false,
              				"diverseFromPath": "VTB003"
              			},
              			"latency": {
              				"latencyValue": "2ms",
              				"ull": true,
              				"routeId": "VPNSEGMENT-1440666242762-1F408E"
              			},
              			"contractTerm": "Auto Renewal/Cease",
              			"ceaseTerm": {
              				"startDate": "2014-02-02",
              				"endDate": "204-03-02",
              				"option": "None/1 day/2 days/1 Week/ 2 Weeks"
              			},
              			"vtbCost": 1200.00,
              			"bandwidthCost": 800
              		}],
              		"StandbyPorts": [{
              			"portId": null,
              			"portAlias": "port31LHC",
              			"portType": "10GFC",
              			"dcid": 1,
              			"assigned": false,
              			"draft": true
              		}, {
              			"portId": null,
              			"portAlias": "port31LHC",
              			"portType": "10GFC",
              			"dcid": 2,
              			"assigned": false,
              			"draft": true
              		}]
              	}
              ]
              };
              return self;
          });
})();

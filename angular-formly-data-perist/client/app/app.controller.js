angular.module('formApp')
  .controller('FormController', FormController);

function FormController(formService,$scope,$timeout) {
  var vm = this;

  // The model object that we reference
  // on the <formly-form> element in index.html
  vm.formData = {};
  var timeoutPromise;
  var delayInMs = 1000;
  var initializing = true;
  $scope.$watch("vm.formData", function(newVal,oldVal) {
        if(newVal == oldVal && initializing){
          initializing = false;
          return;
        }
        $timeout.cancel(timeoutPromise);  //does nothing, if timeout alrdy done
        timeoutPromise = $timeout(function(){  //Set timeout
            var data = {};
            data.user       = 'skywalker';
            data.formData   = JSON.stringify(newVal);
            cacheData(data);
        },delayInMs);
   },true);
  // An array of our form fields with configuration
  // and options set. We make reference to this in
  // the 'fields' attribute on the <formly-form> element
  vm.formFields = {
      firstForm:[
        {
            key: 'first_name',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'First Name',
              placeholder: 'Enter your first name',
              required: true
            }
          }, {
            key: 'last_name',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Last Name',
              placeholder: 'Enter your last name',
              required: true
            }
          }, {
            key: 'email',
            type: 'input',
            templateOptions: {
              type: 'email',
              label: 'Email address',
              placeholder: 'Enter email',
              required: true
            }
          }, {
            key: 'profession',
            type: 'radio',
            templateOptions: {
              label: 'Are you a?',
              options:[
                {
                  name:"UI Developer",
                  value:"ui_developer"
                },
                {
                  name:"UI Designer",
                  value:"ui_designer"
                },
                {
                  name:"Full Stack Developer",
                  value:"full_stack_developer"
                }
              ]
            },
            // Hide this field if we don't have
            // any valid input in the email field
            hideExpression: '!model.email'
          }, {
            key: 'mobile',
            type: 'input',
            templateOptions: {
              label: 'Contact No',
              placeholder: 'Enter your contact number'
            },
            hideExpression: '!model.email',
            validators: {
              // Custom validator to check whether the mobile
              // number that the user enters is valid or not
              contactNo: function($viewValue, $modelValue, scope) {
                var value = $modelValue || $viewValue;
                if (value) {
                  // call the validateContactNo function
                  // which either returns true or false
                  // depending on whether the entry is valid
                  return validateContactNo(value)
                }
              }
            }
          }
      ],
      secondForm:[
        {
          key: "company",
          type: "input",
          templateOptions: {
            type: "text", // or url, or text, etc.
            placeholder: "Where you work",
            label: "Company Name",
            required: true
          }
        },{
          key: "company_at",
          type: "select",
          templateOptions: {
            label: 'Company locate at',
            options:formService.getProvinces(),
            required: true
          },
          hideExpression: '!model.company'
        },{
          key: "permanent_address",
          type: "textarea",
          templateOptions: {
            placeholder: "6/1025,1D3,\nHyder Nagar,\nRajampet",
            label: "Permanent Address",
            rows: 4,
            cols: 15,
            required: true
          }
        },{
          key: 'province',
          type: 'select',
          templateOptions: {
            label: 'Province/Territory',
            options:formService.getProvinces(),
            required: true
          },
          hideExpression: '!model.permanent_address'
        }
      ]
  };
  vm.processForm = function(data){
    var data = {};
    data.user = 'skywalker';
    data.formData = JSON.stringify(data);
    vm.formData = {};
    removeCache(data);
  }
  function removeCache(data){
    formService.removeUser(data).then(function(response){
      console.log(response);
    })
  }
  function cacheData(data){
    console.log('caching data');
    formService.addOrUpdateUser(data).then(function(d){
      console.log(d);
    });
  }
  getCache();
  function getCache(){
    return formService.getUserDetails().then(function(response){
      if(response.status){
        var cacheData = response.data.formData;
        cacheData = JSON.parse(cacheData);
        vm.formData = cacheData;
        return vm.formData;
      }
    })
  }
  function validateContactNo(value){
    return /^\d{10}$/.test(value);
  }

}

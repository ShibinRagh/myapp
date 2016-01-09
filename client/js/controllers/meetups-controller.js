myapp.factory("Post", function($resource) {
  return $resource("/api/meetups/:vote/:id", { id: '@id' },{
    update:{
        method: 'PUT'
    },
    updatevote:{
        method: 'PUT',
        params: {vote:'vote'}
    }
  });
});

myapp.factory("Post2", function($resource) {
  return $resource("/api/testups/:id", { id: '@id' },{
    update:{
        method: 'PUT'
    }
  });
});

myapp.controller('meetupsController', ['$resource', '$scope', '$http', 'Post', function($resource, $scope, $http, Post){
    var vm = this;
    vm.meetups = [];
    vm.data = {};
    Post.query(function(results){
        vm.meetups = results;
        console.log(vm.meetups[0].voting[0].vote);
    });
     vm.editing = false;
     vm.updateId = '';
     vm.updateName = '';
     vm.buttonName = 'Add';
     vm.edit = function(editing){
         
         vm.updateId = vm.meetups[editing]._id;
         vm.editing = true;
         //vm.data = vm.meetups;
         vm.data.name = vm.meetups[editing].name;
         vm.data.job  = vm.meetups[editing].job; 
         vm.buttonName = 'Update';
         console.log(vm.data);
     }
    vm.createMeetup = function(){
        var meetup = new Post(vm.data);
        if(vm.data.name) {
            if( vm.editing == false ){
                meetup.$save(function(result){
                    vm.meetups.push(result); 
                    vm.data.name = '';
                    vm.data.job = '';
                }); 
            }else{
                meetup.$update({ id: vm.updateId }, function(result){
                    Post.query(function(results){
                        vm.meetups = results
                    });
                    vm.data ={};
                    vm.buttonName = 'Add';
                    vm.updateId = '';
                    vm.editing = false;
                });
            }
        }
    };
    
     vm.deleteItem = function(index){
        vm.itemID = index;
        Post.delete({ id: vm.itemID }, function(result){
            Post.query(function(results){
                vm.meetups = results
            });
        });
     }
     
     
     vm.up = function(item, index){
         vm.item = item;
         if(vm.item.voting[0].voteup){
             vm.updatevoteID = vm.item._id;
             var meetup = new Post();
             meetup.vote = vm.item.voting[0].vote + 1 ;
             meetup.voteup = false;
             meetup.votedown = true;
             meetup.$updatevote({id: vm.updatevoteID}, function(results){
                Post.query(function(results){
                    vm.meetups = results;
                });
             });
         }
     }
     
      vm.down = function(item, index){
         vm.item = item;
         if(vm.item.voting[0].votedown){
             vm.updatevoteID = vm.item._id;
             var meetup = new Post();
             meetup.vote = vm.item.voting[0].vote - 1 ;
             meetup.voteup = true;
             meetup.votedown = false;
             meetup.$updatevote({id: vm.updatevoteID}, function(){
                Post.query(function(results){
                    vm.meetups = results
                });
             });
         }
     }; 
     
}]).controller('testupsController', ['$resource', '$scope', '$http', 'Post2', function($resource, $scope, $http, Post2){
    var vm = this;
    vm.testups = [];
    vm.data = {};
    Post2.query(function(results){
        vm.testups = results;
    });
    vm.createTestup = function(){
        if(vm.data.name){
            var testup = new Post2(vm.data);
            if(vm.editing == false){
                testup.$save(function(result){
                    vm.testups.push(result);
                    $scope.testupNa = '';
                });
            }else{
                 testup.$update({id: vm.updateID }, function(){
                     Post2.query(function(results){
                        vm.testups = results;
                     });
                     vm.editing = false;
                     vm.data.name = '';
                     vm.data.job = '';
                     vm.buttonName = 'Add';
                 });
            }
        }
    }
    vm.deleteItem = function(itemid){
        vm.itemId = itemid; 
        Post2.delete({id: vm.itemId}, function(result){
            Post2.query(function(results){
                vm.testups = results;
            });
        });
    }
    vm.buttonName = 'Add';
    vm.editing = false;
    vm.updateID = '';
    vm.edit = function(itemIndex){
        vm.itemIndex = itemIndex;
        vm.data.name = vm.testups[vm.itemIndex].name;
        vm.data.job = vm.testups[vm.itemIndex].job
        vm.updateID = vm.testups[vm.itemIndex]._id
        vm.editing = true;
        vm.buttonName = 'Update';
    }
    
}]);
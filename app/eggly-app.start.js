angular.module("Eggly", [

])
.controller('MainCtrl', function($scope, $http){
  // Get the Bookmarks JSON
  $http.get('data/bookmarks.json').success(function(data) {
    $scope.bookmarks = data;
  });

  $scope.categories = [
    {id: 0, "name": "Development"},
    {id: 1, "name": "Design"},
    {id: 2, "name": "Exercise"},
    {id: 3, "name": "Humor"}
  ];

  

  $scope.currentCategory = null;

  function setCurrentCategory(category) {
    $scope.currentCategory = category;
    cancelCreating();
    cancelEditing();
  };

  function isCurrentCategory (category) {
    return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
  }

  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;

  //-------------------------------------------------------------------------------------------------
  // CRUD
  //-------------------------------------------------------------------------------------------------
  function resetCreateForm() {
    $scope.newBookmark = {
      id: '',
      title: '',
      url: '',
      category: $scope.currentCategory.name
    }
  }

  function createBookmark(bookmark) {
    bookmark.id = $scope.bookmarks.length;
    $scope.bookmarks.push(bookmark);
    resetCreateForm();
    $scope.save();
  };

  // Save to JSON
  $scope.save = function () {
    $http.post('./saveJson.php', $scope.bookmarks).success(function(data) {
      alert('Data saved');
    });
  };

  $scope.createBookmark = createBookmark;

  $scope.editedBookmark = null;

  function setEditedBookmark(bookmark) {
    $scope.editedBookmark = angular.copy(bookmark);
  };

  function updateBookmark(bookmark) {
    var index = _.findIndex($scope.bookmarks, function(b) {
      return b.id == bookmark.id;
    });
    $scope.bookmarks[index] = bookmark;

    $scope.editedBookmark = null;
    $scope.isEditing = false;
    $scope.save();
  };

  function isSelectedBookmark(bookmarkId) {
    return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
  };

  $scope.setEditedBookmark = setEditedBookmark;
  $scope.updateBookmark = updateBookmark;
  $scope.isSelectedBookmark = isSelectedBookmark;
  //-------------------------------------------------------------------------------------------------
  // CREATING AND EDITING STATES
  //-------------------------------------------------------------------------------------------------
  $scope.isCreating = false;
  $scope.isEditing = false;

  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditing = false;

    resetCreateForm();
  }

  function cancelCreating() {
    $scope.isCreating = false;
  }

  function startEditing() {
    $scope.isCreating = false;
    $scope.isEditing = true;
  }

  function cancelEditing() {
    $scope.isEditing = false;
  }

  function shouldShowCreating() {
    return $scope.currentCategory && !$scope.isEditing;
  }

  function shouldShowEditing() {
    return $scope.isEditing && !$scope.isCreating;
  }

  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.startEditing = startEditing;
  $scope.cancelEditing = cancelEditing;
  $scope.shouldShowCreating = shouldShowCreating;
  $scope.shouldShowEditing = shouldShowEditing;

})

;


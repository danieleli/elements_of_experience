
define(['jquery', 'underscore', 'knockout', 'isotope'], function ($, under, ko, iso) {
  var indexVM = {
    ViewModel: function () {
      var self = this;
      self.nodes = ko.observableArray([]);
      self.categories = ko.observableArray([]);
      self.sorts = ['category', 'experience', 'name', 'symbol'];
      self.container = {};

      self.initialize = function (data, elementContain) {
        setData(data);
        setCategories(data);
        initializeContainer(elementContain);
      };

      self.filter = function (current_category) {
        resetSizes();

        current_category.active(!current_category.active());

        var active_filters = _.reduce(self.categories(), function (memo, item) {
          if (item.active() === true) {
            memo += "." + item.name + ", ";
          }
          return memo;
        }, "");

        self.container.isotope({ filter: active_filters });
        return true;
      };

      self.clearFilter = function () {
        resetSizes();
        self.container.isotope({ filter: '' });
        _.map(self.categories(), function (item, index, arr) {
          item.active(false);
        });
        return false;
      };

      self.sort = function (sortBy) {
        $('.element').removeClass('large');
        self.container.isotope({ sortBy: sortBy });
        return true;
      };

      ko.applyBindings(self);

      var setCategories = function (items) {
        var cats = _.reduce(items, function (memo, item) {
          var found = false;
          for (var i = 0; i < memo.length; i++) {
            if (memo[i].name === item.category) {
              found = true;
              continue;
            }
          }
          if (!found) {
            memo.push({ name: item.category, active: ko.observable(false) });
          }
          return memo;
        }, []);
        self.categories(cats);
      };

      var setData = function (data) {
        data = _.map(data, function (item, index, arr) {
          item.clazz = 'element isotope-item ' + item.category;
          return item;
        });

        data = _.sortBy(data, function (item) { return item.name; });
        self.nodes(data);
      };

      var initializeContainer = function (elementContainer) {
        self.container = elementContainer;
        elementContainer.isotope({
          itemSelector: 'div',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: 120
          },
          masonryHorizontal: {
            rowHeight: 120
          },
          cellsByRow: {
            columnWidth: 240,
            rowHeight: 240
          },
          cellsByColumn: {
            columnWidth: 240,
            rowHeight: 240
          },
          getSortData: {
            name: function ($elem) {
              return $elem.find('.name').text();
            },
            category: function ($elem) {
              return $elem.find('.category').text();
            },
            symbol: function ($elem) {
              return $elem.find('.symbol').text();
            },
            experience: function ($elem) {
              return parseInt($elem.find('.experience').text());
            }
          }
        });

        elementContainer.delegate('.element', 'click', function () {
          if ($(this).hasClass('large')) {
            // if large then remove large
            $(this).toggleClass('large');
          }
          else {
            // if not large remove all large then add large to this.
            $('.element').removeClass('large')
            $(this).toggleClass('large');
          }
          elementContainer.isotope('reLayout');
        });
      };

      var resetSizes = function () {
        $('.element').removeClass('large');
      };
    }
  }
  return indexVM;
});

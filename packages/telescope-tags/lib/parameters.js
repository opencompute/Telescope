// Category Parameter
// Add a "categories" property to terms which can be used to filter *all* existing Posts views. 
function addCategoryParameter (parameters, terms) {

  var cat = terms.cat || terms["cat[]"];

  // filter by category if category slugs are provided
  if (cat) {

    var categoriesIds = [];
    var find = {};

    if (typeof cat === "string") { // cat is a string
      find = {slug: cat};
    } else if (Array.isArray(cat)) { // cat is an array
      find = {slug: {$in: cat}};
    }

    // get all categories passed in terms
    var categories = Categories.find(find).fetch();
    
    // for each category, add its ID and the IDs of its children to categoriesId array
    categories.forEach(function (category) {
      categoriesIds.push(category._id);
      categoriesIds = categoriesIds.concat(_.pluck(category.getChildren(), "_id"));
    });

    parameters.find.categories = {$in: categoriesIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", addCategoryParameter);